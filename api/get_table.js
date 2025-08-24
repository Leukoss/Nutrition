import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  const { table } = req.query;

  try {
    if (!table) {
      return res.status(400).json({ success: false, error: 'Missing table parameter' });
    }

    const { data, error } = await supabase.from(table).select('*');

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Supabase error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
}
