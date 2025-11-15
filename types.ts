
export interface Meal {
  type: string;
  calories: number;
}

export interface UserInput {
  wakeUpTime: string;
  sleepTime: string;
  totalSleepHours: number;
  waterIntake: number; // in glasses
  meals: Meal[];
  exerciseMinutes: number;
  steps: number;
  stressLevel: number; // 0-10
  mood: string;
  bp: {
    sys: number;
    dia: number;
  };
  sugar: {
    fasting: number;
    pp: number;
  };
  heartRate: number;
  oxygen: number;
  weight: number; // in kg
}

export interface RoutineAnalysis {
  wakeUp: string;
  sleep: string;
  waterIntake: string;
  meals: string;
  exercise: string;
  steps: string;
  stressAndMood: string;
}

export interface MedicalAnalysis {
  bloodPressure: string;
  bloodSugar: string;
  heartRate: string;
  oxygenLevel: string;
  weight: string;
}

export interface AnalysisResult {
  routineAnalysis: RoutineAnalysis;
  medicalAnalysis: MedicalAnalysis;
  lifestyleCorrelations: string[];
  overallSummary: string;
  suggestions: string[];
}
