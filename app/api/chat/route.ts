import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT, FALLBACK_MESSAGE } from '@/lib/chatbot/prompt';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

// Opus 4.8 par défaut (modèle le plus capable). Surchargé via CHATBOT_MODEL —
// ex. claude-haiku-4-5 pour réduire fortement le coût d'un bot public.
const MODEL = process.env.CHATBOT_MODEL || 'claude-opus-4-8';

// Le paramètre `effort` n'est pas supporté par Haiku 4.5 ni Sonnet 4.5 (400).
// On ne l'envoie donc que pour les modèles qui l'acceptent (Opus, Sonnet 4.6, Fable).
const SUPPORTS_EFFORT = !/haiku|sonnet-4-5/i.test(MODEL);

const MAX_MESSAGES = 20;
const MAX_CHARS_PER_MESSAGE = 2000;
const MAX_TOTAL_CHARS = 8000;

// Limitation de débit best-effort (en mémoire, par instance). Pour une vraie
// protection multi-instances, brancher un store type Vercel KV / Redis.
const RL_WINDOW_MS = 60_000;
const RL_MAX = 30;
const rlHits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rlHits.get(ip) ?? []).filter((t) => now - t < RL_WINDOW_MS);
  recent.push(now);
  rlHits.set(ip, recent);
  if (rlHits.size > 5000) {
    for (const [key, times] of rlHits) {
      if (times.every((t) => now - t >= RL_WINDOW_MS)) rlHits.delete(key);
    }
  }
  return recent.length > RL_MAX;
}

type ChatMessage = { role: 'user' | 'assistant'; content: string };

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== 'object') return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_MESSAGES) return null;

  let total = 0;
  const out: ChatMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== 'object') return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return null;
    const text = content.trim();
    if (!text || text.length > MAX_CHARS_PER_MESSAGE) return null;
    total += text.length;
    out.push({ role, content: text });
  }
  if (total > MAX_TOTAL_CHARS) return null;
  const first = out[0];
  const last = out[out.length - 1];
  if (!first || !last || first.role !== 'user' || last.role !== 'user') return null;
  return out;
}

function textResponse(text: string, status = 200): Response {
  return new Response(text, {
    status,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

// Diagnostic léger : ouvrir /api/chat dans le navigateur indique si la clé est
// bien chargée dans CET environnement (sans jamais exposer la clé elle-même).
export function GET(): Response {
  return Response.json({
    configured: Boolean(process.env.ANTHROPIC_API_KEY),
    model: MODEL,
  });
}

export async function POST(req: Request): Promise<Response> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return textResponse(FALLBACK_MESSAGE);

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return textResponse(
      'Vous envoyez des messages un peu trop vite. Merci de patienter quelques instants — ou écrivez directement à l’équipe sur WhatsApp.',
      429,
    );
  }

  let messages: ChatMessage[] | null;
  try {
    messages = parseMessages(await req.json());
  } catch {
    messages = null;
  }
  if (!messages) return textResponse('Requête invalide.', 400);

  const client = new Anthropic({ apiKey });
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let sentAny = false;
      try {
        const llm = client.messages.stream({
          model: MODEL,
          max_tokens: 1024,
          system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
          messages,
          ...(SUPPORTS_EFFORT ? { output_config: { effort: 'low' as const } } : {}),
        });
        for await (const event of llm) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta' &&
            event.delta.text
          ) {
            sentAny = true;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        console.error('[chat] stream error:', err instanceof Error ? err.message : err);
      } finally {
        if (!sentAny) controller.enqueue(encoder.encode(FALLBACK_MESSAGE));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
