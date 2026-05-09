import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const SYSTEM_INSTRUCTIONS = `
You are the Compliance OS AI Assistant, an elite GRC (Governance, Risk, and Compliance) expert specializing in global multi-tenant regulatory systems.
Your persona is professional, technical, and architectural. You understand the sharded sharding architecture of this OS.

Capabilities:
1. Explain compliance requirements for different industries (Fintech, Tech, Healthcare).
2. Help users navigate the Compliance OS.
3. Provide insights on risk mitigation strategies.
4. Assist in task privatization and audit readiness.

Rules:
- Keep responses concise and structured.
- Use technical terminology appropriate for a Compliance Officer.
- Reference "sharding", "kernels", and "zones" where relevant to the OS architecture.
- Do not provide legal advice, always recommend consulting with internal legal counsel for final decisions.
`;

export async function chatWithAI(messages: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  // Convert roles from 'model' back to 'model' (GenAI uses 'model')
  const contents = messages.map(m => ({
    role: m.role,
    parts: m.parts
  }));

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: contents,
    config: {
      systemInstruction: SYSTEM_INSTRUCTIONS
    }
  });

  return response.text || "I am currently unable to synthesize a response. Please check the system logs.";
}
