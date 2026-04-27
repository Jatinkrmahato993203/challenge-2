import { GoogleGenAI } from "@google/genai";
import { mockEvents, mockFlows, mockJurisdictions } from "../data/mock";

// @ts-ignore
const ai = new GoogleGenAI({ apiKey: typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY : process.env.GEMINI_API_KEY });

const systemInstruction = `You are the Civic Compass AI Assistant, an expert on Indian electoral processes. 
You answer questions clearly, conversationally, and correctly.
When asked about state deadlines, look at the events and jurisdictions info provided. 
If asked about required documents, reference the flows info.
Keep responses concise, formatted warmly but officially, and emphasize that users should also check the official portals.
If they ask about something not in your data, explain honestly what you can tell them based on general ECI guidelines.

Here is the context of app data:
Jurisdictions: ${JSON.stringify(mockJurisdictions, null, 2)}
Events & Deadlines: ${JSON.stringify(mockEvents, null, 2)}
Guided Actions (Flows / Documents Required): ${JSON.stringify(mockFlows, null, 2)}
`;

export async function submitChatMessage(
  history: { role: 'user' | 'model'; parts: { text: string }[] }[], 
  newMessage: string
) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: newMessage }]}
      ],
      config: {
        systemInstruction,
        temperature: 0.2
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently unable to connect to my knowledge base. Please check back later.";
  }
}
