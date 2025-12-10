import { GoogleGenAI, SchemaType, Type } from "@google/genai";
import { DiseaseAnalysis } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const modelName = "gemini-2.5-flash"; // Multimodal, fast model

export const analyzeCropImage = async (base64Image: string): Promise<DiseaseAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image
            }
          },
          {
            text: `You are an agricultural expert for the Gandaki Province in Nepal. 
            Analyze this image. 
            1. Determine if this is a plant/crop.
            2. If yes, identify the specific disease (e.g., Late Blight, Rice Blast, Bacterial Wilt) or if it is healthy.
            3. Assess severity.
            4. Provide 3 specific treatment steps suitable for a Nepali farmer (organic or chemical available in Nepal).
            
            Return ONLY valid JSON matching this schema.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isPlant: { type: Type.BOOLEAN },
            name: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            description: { type: Type.STRING },
            severity: { type: Type.STRING, enum: ["Low", "Medium", "High", "Critical"] },
            treatment: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["isPlant", "name", "confidence", "description", "severity", "treatment"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as DiseaseAnalysis;
    }
    throw new Error("No response text from Gemini");
  } catch (error) {
    console.error("AI Analysis Failed:", error);
    // Fallback for demo if API fails or key is missing
    return {
      isPlant: true,
      name: "Analysis Error",
      confidence: 0,
      description: "Could not connect to AI service. Please check your internet or API Key.",
      severity: "Low",
      treatment: ["Check internet connection", "Try again later"]
    };
  }
};

export const getMarketAdvice = async (crop: string, currentPrice: number): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an agri-economist in Pokhara, Nepal. The current price of ${crop} is NPR ${currentPrice}/kg. 
      Give a 2-sentence advice to a farmer on whether to sell now or wait, considering typical seasonal trends in Gandaki.`
    });
    return response.text || "Market data unavailable.";
  } catch (e) {
    return "Advice currently unavailable.";
  }
};
