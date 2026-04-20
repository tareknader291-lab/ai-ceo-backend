const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.send("AI CEO Backend is running 🚀");
});

// endpoint الذكاء
app.post("/chat", async (req, res) => {
  const message = req.body.message;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const completion = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: `
You are an AI CEO.
You think like a business executive.

Your job:
- Make decisions
- Give strategies
- Break ideas into steps
- Be direct and practical
- No small talk

Always respond like a CEO, not a chatbot.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.output[0].content[0].text;

    res.json({ reply });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: "AI error" });
  }
});

// تشغيل السيرفر
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
