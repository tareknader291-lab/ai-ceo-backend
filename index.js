import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/ai", async (req, res) => {
  const { message, user, room } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization":Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `
أنت مدير غرفة دردشة ذكي.

المستخدم: ${user}
الغرفة: ${room}
الرسالة: ${message}

قرر:
- هل ترد؟
- وإذا ترد، رد بشكل ذكي ومحفز
- لا تزعج المستخدمين
`
      })
    });

    const data = await response.json();

    const reply = data.output[0].content[0].text;

    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.json({ reply: null });
  }
});

app.listen(3000, () => {
  console.log("AI server running...");
});
