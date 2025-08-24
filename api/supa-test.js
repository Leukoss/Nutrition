// Server-side API route
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Initialize Supabase client **server-side only**
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  try {
    // Example: fetch first 10 recipes
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .limit(10);

    if (error) throw error;

    res.status(200).json({ success: true, recipes: data });
  } catch (err) {
    console.error('Supabase error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
}
