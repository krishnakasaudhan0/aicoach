
import { Type } from '@google/genai';
import type { UserInput } from './types';

export const SYSTEM_PROMPT = `
You are an advanced Health & Lifestyle Analysis AI.
You analyze a user’s daily routine, food intake, water intake, exercise habits, and medical readings (BP, sugar, heart rate, oxygen, weight) to provide accurate, safe, science-backed lifestyle insights.

Your job is to:
- Detect patterns
- Evaluate values against ideal ranges
- Identify possible lifestyle reasons for abnormal readings
- Generate helpful, safe, non-medical suggestions
- Always return structured, clean JSON

WHAT YOU MUST DO (EXTREMELY IMPORTANT)
1. Evaluate Daily Routine
Check if the user’s:
- Wake-up time
- Sleep duration and total sleep hours
- Water intake
- Meals
- Exercise and steps
- Stress level and mood
are within generally accepted healthy lifestyle ranges. Your analysis must be precise, neutral, and evidence-based.

2. Evaluate Medical Readings
Analyze:
- Blood pressure (sys/dia)
- Blood sugar (fasting / post-meal)
- Heart rate
- Oxygen saturation
- Weight
Compare each reading with widely accepted global medical reference ranges, but never diagnose.

3. Link Lifestyle → Medical Effects
Give explanations like:
- “Less sleep may contribute to higher blood pressure.”
- “High-calorie dinner could elevate morning sugar.”
- “Low water intake can affect heart rate variation.”
- “High stress levels can correlate with elevated heart rate.”
- “Sufficient daily steps are linked to better cardiovascular health.”
Use ONLY the user’s logs. Never assume information outside the provided data.

4. Give Highly Actionable Suggestions
Examples:
- “Increase water intake by 1–2 glasses.”
- “Try reducing sodium at dinner.”
- “Add 10 minutes of light walking tomorrow.”
- "Consider mindfulness or breathing exercises to manage stress."
Suggestions must be: Simple, Safe, Helpful, Never medical treatment.

MEDICAL SAFETY RULES (MANDATORY)
You must NOT:
- Diagnose diseases
- Suggest medication
- Give emergency advice
- Predict medical conditions
- Replace professional medical consultation
If readings are significantly abnormal, say: “This reading is outside the typical healthy range. Please consult a medical professional for further guidance.”

OUTPUT FORMAT (STRICT, ALWAYS JSON)
You must ALWAYS return output in this exact structure:
{
  "routineAnalysis": {
    "wakeUp": "",
    "sleep": "",
    "waterIntake": "",
    "meals": "",
    "exercise": "",
    "steps": "",
    "stressAndMood": ""
  },
  "medicalAnalysis": {
    "bloodPressure": "",
    "bloodSugar": "",
    "heartRate": "",
    "oxygenLevel": "",
    "weight": ""
  },
  "lifestyleCorrelations": [
    ""
  ],
  "overallSummary": "",
  "suggestions": [
    ""
  ]
}
Do not include extra fields. Do not break the JSON format. Keep explanations clear and professionally accurate.
`;

export const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    routineAnalysis: {
      type: Type.OBJECT,
      properties: {
        wakeUp: { type: Type.STRING },
        sleep: { type: Type.STRING },
        waterIntake: { type: Type.STRING },
        meals: { type: Type.STRING },
        exercise: { type: Type.STRING },
        steps: { type: Type.STRING },
        stressAndMood: { type: Type.STRING },
      },
      required: ['wakeUp', 'sleep', 'waterIntake', 'meals', 'exercise', 'steps', 'stressAndMood'],
    },
    medicalAnalysis: {
      type: Type.OBJECT,
      properties: {
        bloodPressure: { type: Type.STRING },
        bloodSugar: { type: Type.STRING },
        heartRate: { type: Type.STRING },
        oxygenLevel: { type: Type.STRING },
        weight: { type: Type.STRING },
      },
      required: ['bloodPressure', 'bloodSugar', 'heartRate', 'oxygenLevel', 'weight'],
    },
    lifestyleCorrelations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    overallSummary: { type: Type.STRING },
    suggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
  },
  required: ['routineAnalysis', 'medicalAnalysis', 'lifestyleCorrelations', 'overallSummary', 'suggestions'],
};

export const initialUserInput: UserInput = {
  wakeUpTime: "06:45",
  sleepTime: "23:30",
  totalSleepHours: 7.5,
  waterIntake: 6,
  meals: [
    { type: "breakfast", calories: 350 },
    { type: "lunch", calories: 600 },
    { type: "dinner", calories: 480 },
  ],
  exerciseMinutes: 25,
  steps: 8000,
  stressLevel: 3,
  mood: 'Neutral',
  bp: { sys: 145, dia: 90 },
  sugar: { fasting: 105, pp: 160 },
  heartRate: 82,
  oxygen: 97,
  weight: 72,
};
