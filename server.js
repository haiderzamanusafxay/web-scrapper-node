const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const chatRoute = require("./routes/chat");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api", chatRoute);

app.get("/", (req, res) => {
  res.send("!Ok");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api`);
});
