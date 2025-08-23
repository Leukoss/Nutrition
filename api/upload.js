import { put } from '@vercel/blob';

export const config = {
  runtime: 'edge',
};

export default async function handleUpload(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Méthode non autorisée' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const url = new URL(request.url);
  const filename = url.searchParams.get('filename');

  if (!filename) {
    return new Response(JSON.stringify({ error: 'Nom de fichier manquant' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = request.body;

  if (!body) {
    return new Response(JSON.stringify({ error: 'Aucun fichier fourni' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const blob = await put(filename, body, {
      access: 'public',
      allowOverwrite: true,
    });
    return new Response(JSON.stringify(blob), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur de téléchargement Vercel Blob :', error);
    return new Response(JSON.stringify({ error: 'Échec du téléchargement de l\'image' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}