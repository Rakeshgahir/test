
import { GoogleGenAI, Type } from "@google/genai";

/* Fix: Always use process.env.API_KEY directly for initialization */
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStandardDetails = async (isoNumber: string | number) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a detailed professional summary of ISO/IEC ${isoNumber}. 
      Include its purpose, key components, and why it is important for modern organizations. 
      Format the response in Markdown with clear headings.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching ISO details:", error);
    return "I was unable to retrieve specific details for this standard at this moment. Please check the official ISO website.";
  }
};

export const searchISODatabase = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The user is searching for an ISO standard in the 27000 family with this query: "${query}". 
      If it's a specific number between 27000 and 27701, provide the official title and a 2-sentence summary. 
      If it's a general topic, list 3-5 relevant ISO 27000-series standards. 
      Respond in a structured JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            results: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  number: { type: Type.STRING },
                  title: { type: Type.STRING },
                  summary: { type: Type.STRING }
                },
                required: ["number", "title", "summary"]
              }
            }
          },
          required: ["results"]
        }
      }
    });

    const data = JSON.parse(response.text || '{"results": []}');
    return data.results;
  } catch (error) {
    console.error("Error searching ISO database:", error);
    return [];
  }
};
