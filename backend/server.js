const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", (req, res) => {
    const { message } = req.body;

    // Mock AI response
    const aiResponses = [
        "Hello! How can I assist you?",
        "I'm just a mock AI, but I'll try my best!",
        "That sounds interesting! Tell me more.",
        "I'm here to help!"
    ];

    const aiMessage = aiResponses[Math.floor(Math.random() * aiResponses.length)];

    res.json({ message: aiMessage });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
