
import { GoogleGenAI } from "@google/genai";
import type { UserInput, AnalysisResult } from '../types';
import { SYSTEM_PROMPT, RESPONSE_SCHEMA } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const formatUserInputForPrompt = (userInput: UserInput): string => {
  return `
    Analyze the following user data:
    \`\`\`json
    ${JSON.stringify(userInput, null, 2)}
    \`\`\`
  `;
}

export const getHealthAnalysis = async (userInput: UserInput): Promise<AnalysisResult> => {
  try {
    const userPrompt = formatUserInputForPrompt(userInput);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const text = response.text.trim();
    if (!text) {
      throw new Error("API returned an empty response.");
    }
    
    const parsedResult: AnalysisResult = JSON.parse(text);
    return parsedResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof SyntaxError) {
      throw new Error("Failed to parse the API response. The format was invalid.");
    }
    throw new Error(`An error occurred while fetching the analysis: ${error instanceof Error ? error.message : String(error)}`);
  }
};
