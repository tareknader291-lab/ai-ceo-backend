import express from "express";

const app = express();
app.use(express.json());

app.post("/ai-action", (req, res) => {
  const { action, reason, priority } = req.body;

  console.log("AI Action Received:", req.body);

  switch (action) {
    case "check_payment":
      console.log("Checking payment...");
      break;

    case "add_coins":
      console.log("Adding coins...");
      break;

    case "create_ticket":
      console.log("Creating support ticket...");
      break;

    case "bug_report":
      console.log("Logging bug...");
      break;

    default:
      console.log("Ignoring...");
  }

  res.json({ status: "success" });
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
