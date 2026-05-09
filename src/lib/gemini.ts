import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set. AI features will not work.");
}

export const genAI = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function askComplianceAssistant(query: string) {
  if (!genAI) throw new Error("AI Assistant is not configured.");

  const response = await genAI.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: query,
    config: {
      systemInstruction: "You are an expert Compliance Officer and Governance Consultant for 'Compliance OS'. Your goal is to provide accurate, concise, and helpful advice on regulations like SOC2, GDPR, HIPAA, and ISO 27001. Use professional but accessible language. If you don't know something, advise the user to consult a legal professional.",
      temperature: 0.7,
    },
  });

  return response.text;
}
