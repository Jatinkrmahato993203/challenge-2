import { GoogleGenAI } from "@google/genai";
import { mockEvents, mockFlows, mockJurisdictions } from "../data/mock";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
if (!apiKey) console.warn('VITE_GEMINI_API_KEY is not set. AI chat will not work.');
const ai = new GoogleGenAI({ apiKey: apiKey ?? '' });

const slimContext = {
  jurisdictions: mockJurisdictions.map(j => ({ id: j.id, name: j.name })),
  events: mockEvents.map(e => ({
    id: e.id, title: e.title, type: e.type,
    date: e.startDate, jurisdiction: e.jurisdiction
  })),
  flows: Object.values(mockFlows).map(f => ({
    id: f.id, title: f.title,
    steps: f.steps.length
  })),
};

const systemInstruction = `You are the Civic Compass AI Assistant, an expert on Indian electoral processes. 
You answer questions clearly, conversationally, and correctly.
When asked about state deadlines, look at the events and jurisdictions info provided. 
If asked about required documents, reference the flows info.
Keep responses concise, formatted warmly but officially, and emphasize that users should also check the official portals.
If they ask about something not in your data, explain honestly what you can tell them based on general ECI guidelines.

Here is the context of app data:
${JSON.stringify(slimContext)}
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
