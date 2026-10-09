import { type NextRequest, NextResponse } from 'next/server';
import { issueSignedToken, presignUrl } from '@vercel/blob';
import { getKitFile, verifyToken } from '@/lib/kit';

export const dynamic = 'force-dynamic';

/** Durée de vie de l'URL présignée vers le store privé : juste le temps de lancer le téléchargement. */
const PRESIGN_TTL_MS = 10 * 60 * 1000;

/**
 * GET /api/kit/<slug>?acces=<jeton>[&dl=1]
 * Vérifie le jeton d'accès, puis redirige vers une URL Vercel Blob présignée de courte
 * durée (les fichiers lourds ne transitent pas par la fonction, limitée à 4,5 Mo).
 */
export async function GET(request: NextRequest, { params }: { params: { file: string } }) {
  const access = verifyToken(request.nextUrl.searchParams.get('acces'), 'access');
  if (!access) {
    return new NextResponse('Accès expiré ou invalide.', {
      status: 403,
      headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
    });
  }

  const file = getKitFile(params.file);
  if (!file) return new NextResponse('Fichier introuvable.', { status: 404 });

  try {
    const validUntil = Date.now() + PRESIGN_TTL_MS;
    const token = await issueSignedToken({
      pathname: file.pathname,
      operations: ['get'],
      validUntil,
    });
    const { presignedUrl } = await presignUrl(token, {
      operation: 'get',
      pathname: file.pathname,
      access: 'private',
      validUntil,
    });
    const download = request.nextUrl.searchParams.get('dl') === '1';
    return NextResponse.redirect(download ? `${presignedUrl}&download=1` : presignedUrl, {
      status: 302,
      headers: { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex' },
    });
  } catch (err) {
    console.error('[kit] presign', err);
    return new NextResponse('Fichier momentanément indisponible.', { status: 503 });
  }
}
