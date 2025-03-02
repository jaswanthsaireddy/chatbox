const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let pastConversations = []; // In-memory storage for past conversations

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

// Endpoint to store finished conversations
app.post("/api/conversations", (req, res) => {
    const { messages, feedback } = req.body;

    console.log("Received:", { messages, feedback });

    if (!messages || messages.length === 0) {
        return res.status(400).json({ error: "No conversation data provided." });
    }
    if (!feedback ){
        return res.status(400).json({error:"feedback is null"});
    }

    const conversation = { id: pastConversations.length + 1, messages, feedback };
    pastConversations.push(conversation);

    res.status(201).json({ message: "Conversation stored successfully.", conversation });
});

// Endpoint to fetch all past conversations
app.get("/api/conversations", (req, res) => {
    res.json(pastConversations);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
