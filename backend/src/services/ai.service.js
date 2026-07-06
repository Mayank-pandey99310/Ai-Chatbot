const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function getChat(message,previousId = null) {
    
    const interaction = await ai.interactions.create({
        model: "gemini-3.1-flash-lite",
        input: message,
        previous_interaction_id: previousId,
    });
    return {text:interaction.output_text,
            id: interaction.id}
}

module.exports = getChat