export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, email, phone, area, message } = req.body;

    const response = await fetch("https://xsobqoujijvaxcjukrjw.supabase.co/rest/v1/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": "sb_publishable_EdfllRdoVQBMzWSASRo4Sw_HPLlXUqt",
        "Authorization": "Bearer sb_publishable_EdfllRdoVQBMzWSASRo4Sw_HPLlXUqt",
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({ name, email, phone, area, message, created_at: new Date().toISOString() }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Supabase error:", response.status, error);
      return res.status(500).json({ error: "Failed to save", detail: error });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: String(err) });
  }
}