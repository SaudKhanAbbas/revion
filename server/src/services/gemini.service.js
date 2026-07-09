import { GoogleGenAI } from "@google/genai";

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing.");
  }

  return new GoogleGenAI({ apiKey });
}

export async function diagnoseWithGemini(symptom) {
  const ai = getClient();

  const prompt = `
You are a senior motorcycle mechanic.

A rider reports:

"${symptom}"

Return ONLY valid JSON.

{
  "diagnosis":"short diagnosis",

  "possibleCauses":[
    "...",
    "...",
    "..."
  ],

  "recommendation":[
    "...",
    "...",
    "..."
  ],

  "severity":"Low",

  "confidence":90
}

Rules:

- JSON only.
- No markdown.
- No explanations.
- No code fences.
- diagnosis <= 60 words.
- Exactly 3 possible causes.
- Exactly 3 recommendations.
- confidence must be an integer from 0-100.
- severity must be Low, Medium or High.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,

    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text.trim());
}