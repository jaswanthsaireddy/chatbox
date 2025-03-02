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
        "I'm here to help!",
        "Can you elaborate on that?",
        "That's a great question!",
        "I'm still learning, but I'll do my best!",
        "How can I make your experience better?",
        "Interesting! What else can you share?",
        "I appreciate your input!",
        "I'm always here to chat!",
        "Would you like me to summarize that?",
        "Tell me more about your thoughts!",
        "That sounds exciting!",
        "Hmm, let me think about that.",
        "I see! Do you want to continue this topic?",
        "Great point! What do you think should happen next?",
        "I love discussing this! What’s your perspective?",
        "Let's explore that idea further.",
        "I’m curious to hear more!",
        "That’s an interesting way to look at it.",
        "I’d love to help! Can you clarify a bit?",
        "Let’s keep the conversation going!",
        "I appreciate you sharing that!",
        "You’re making great points!"
    ];
    

    const aiMessage = aiResponses[Math.floor(Math.random() * aiResponses.length)];

    res.json({ message: aiMessage });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
