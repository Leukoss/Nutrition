import { list } from "@vercel/blob";

export default async function handler(req, res) {
  try {
    // List all items in the blob
    const result = await list();
    res.status(200).json({ success: true, blobs: result.blobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
