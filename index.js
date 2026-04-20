const express = require("express");
const app = express();

app.use(express.json());

app.post("/ai", async (req, res) => {
  const message = req.body.message;

  console.log("Received:", message);

  // هنا لاحقًا نربط OpenAI
  const response = "AI CEO received: " + message;

  res.json({
    success: true,
    reply: response
  });
});

app.get("/", (req, res) => {
  res.send("AI CEO Backend is running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
