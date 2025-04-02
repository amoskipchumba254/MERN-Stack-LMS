const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

// Route to send text to Flask API
router.post("/", async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "No text provided" });
        }

        const flaskResponse = await fetch("http://127.0.0.1:5001/summarize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        const data = await flaskResponse.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to summarize text" });
    }
});

module.exports = router;
