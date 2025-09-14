// /api/chat.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { q } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: q }]
      })
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ answer: data.choices[0].message.content });
    } else {
      return res.status(500).json({ error: data });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
