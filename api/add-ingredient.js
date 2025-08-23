import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const config = {
  runtime: 'edge',
};

export default async function handleAddIngredient(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Méthode non autorisée' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const ingredientData = await request.json();

    const { data, error } = await supabase
      .from('ingredients')
      .insert([
        ingredientData,
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return new Response(JSON.stringify({ error: 'Erreur lors de l\'ajout de l\'ingrédient' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Ingrédient ajouté avec succès:', data);
    return new Response(JSON.stringify({ message: 'Ingrédient ajouté avec succès', data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (e) {
    console.error('Error parsing request body:', e);
    return new Response(JSON.stringify({ error: 'Données invalides' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}