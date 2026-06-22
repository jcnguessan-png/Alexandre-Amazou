'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { siteConfig } from '@/lib/site-config';
import './chat.css';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const WA = siteConfig.contact.whatsapp;
const GREETING = `Bonjour 🙏 Je suis l'assistant du site du ${siteConfig.name}. Posez-moi vos questions sur ses livres, ses enseignements, le podcast, sa biographie ou comment le contacter.`;
const SUGGESTIONS = [
  'Quels sont ses livres best-sellers ?',
  'Comment commander un livre ?',
  'Où écouter ses enseignements ?',
  'Comment le contacter ?',
];
const CLIENT_FALLBACK = `Désolé, je rencontre un souci technique. Pour une réponse rapide, écrivez à l'équipe sur WhatsApp : ${WA}`;

const LINK_RE =
  /(https?:\/\/[^\s)]+|wa\.me\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.-]+|\/(?:mes-livres|mes-enseignements|a-propos|podcast|me-contacter|faire-un-don|newsletter|temoignages|presse)(?:\/[\w-]+)?)/g;

function linkify(text: string): ReactNode[] {
  const parts = text.split(LINK_RE);
  return parts.map((part, i) => {
    if (i % 2 === 0) return part;
    const trail = part.match(/[.,;:!?]+$/)?.[0] ?? '';
    const token = trail ? part.slice(0, -trail.length) : part;
    let href = token;
    if (token.startsWith('wa.me/')) href = `https://${token}`;
    else if (!token.startsWith('http') && !token.startsWith('/') && token.includes('@'))
      href = `mailto:${token}`;
    const external = href.startsWith('http') || href.startsWith('mailto:');
    return (
      <span key={i}>
        <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
          {token}
        </a>
        {trail}
      </span>
    );
  });
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const payload: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages([...payload, { role: 'assistant', content: '' }]);
    setInput('');
    setLoading(true);

    const setLastAssistant = (content: string) =>
      setMessages((prev) => {
        const next = prev.slice();
        next[next.length - 1] = { role: 'assistant', content };
        return next;
      });

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payload }),
      });
      if (!res.body) throw new Error('no stream');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setLastAssistant(acc);
      }
      if (!acc.trim()) setLastAssistant(CLIENT_FALLBACK);
    } catch {
      setLastAssistant(CLIENT_FALLBACK);
    } finally {
      setLoading(false);
    }
  }

  const lastIsEmptyAssistant =
    loading &&
    messages.length > 0 &&
    messages[messages.length - 1]?.role === 'assistant' &&
    messages[messages.length - 1]?.content === '';

  return (
    <div className="amz-chat">
      {open ? (
        <div className="amz-chat-panel" role="dialog" aria-label="Assistant du site">
          <div className="amz-chat-head">
            <span className="amz-avatar" aria-hidden="true">
              <ChatIcon />
            </span>
            <span className="amz-title">
              <strong>Assistant</strong>
              <span>
                <span className="amz-status">●</span> Site du Pasteur Alexandre AMAZOU
              </span>
            </span>
            <button className="amz-chat-close" onClick={() => setOpen(false)} aria-label="Fermer l'assistant">
              <CloseIcon />
            </button>
          </div>

          <div className="amz-chat-body" ref={bodyRef} aria-live="polite">
            <div className="amz-msg bot">{GREETING}</div>

            {messages.map((m, i) => {
              if (lastIsEmptyAssistant && i === messages.length - 1) {
                return (
                  <div className="amz-msg bot" key={i}>
                    <span className="amz-typing" aria-label="L'assistant écrit…">
                      <span />
                      <span />
                      <span />
                    </span>
                  </div>
                );
              }
              return (
                <div className={`amz-msg ${m.role === 'user' ? 'user' : 'bot'}`} key={i}>
                  {m.role === 'assistant' ? linkify(m.content) : m.content}
                </div>
              );
            })}

            {messages.length === 0 ? (
              <div className="amz-suggests">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="amz-chat-foot">
            <form
              className="amz-chat-form"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                placeholder="Écrivez votre question…"
                aria-label="Votre message"
                maxLength={2000}
              />
              <button className="amz-chat-send" type="submit" disabled={loading || !input.trim()} aria-label="Envoyer">
                <SendIcon />
              </button>
            </form>
            <span className="amz-wa">
              Besoin d’une personne ?{' '}
              <a href={WA} target="_blank" rel="noopener noreferrer">
                Discuter sur WhatsApp
              </a>
            </span>
          </div>
        </div>
      ) : null}

      <button
        className="amz-chat-launcher"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant"}
        aria-expanded={open}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>
    </div>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.4 20.4 21 12 3.4 3.6 3 10l12 2-12 2z" />
    </svg>
  );
}
