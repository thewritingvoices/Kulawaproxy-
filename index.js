const express = require("express");
const fetch = require("node-fetch");
const { OPENAI_API_KEY } = require("./config"); // changed from env to config file

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    // Allow frontend to access this response
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "*");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy failed", details: err.message });
  }
});

app.listen(process.env.PORT || 8080);
