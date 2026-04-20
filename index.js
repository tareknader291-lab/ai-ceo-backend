const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {

  res.send("AI CEO Backend is running 🚀");

});

app.post("/chat", async (req, res) => {

  const message = req.body.message;

  res.json({

    reply: "You said: " + message,

  });

});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {

  console.log("Server running on port " + PORT);

});
