import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/ai", async (req, res) => {
  try {
    const { message, user, room } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `
أنت مدير غرفة دردشة ذكي.

اسم المستخدم: ${user}
الغرفة: ${room}

رسالة المستخدم:
${message}

رد بطريقة طبيعية، قصيرة، وتفاعلية.
`
      })
    });

    const data = await response.json();

    const reply =
      data.output?.[0]?.content?.[0]?.text || "⚠️ ما قدرت أرد الآن";

    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.json({ reply: "⚠️ AI server error" });
  }
});

app.listen(3000, () => {
  console.log("AI server running...");
});
