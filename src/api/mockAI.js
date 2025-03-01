export const fetchMockAIResponse = async (message) => {
    const responses = [
      "Hello! How can I assist you today?",
      "That's an interesting question!",
      "I'm here to help. Ask me anything!",
      "Can you clarify what you mean?",
      "I'm just a simple AI, but I'll do my best to help!"
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return { message: randomResponse };
  };
  