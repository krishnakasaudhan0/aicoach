
import React from 'react';
import type { UserInput } from '../types';

interface InputFormProps {
  userInput: UserInput;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  onReset: () => void;
}

const InputField: React.FC<{
  label: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit?: string;
  step?: string;
  min?: string;
  max?: string;
}> = ({ label, name, type, value, onChange, unit, step, min, max }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
    <div className="flex items-center">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        step={step}
        min={min}
        max={max}
        className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
      />
      {unit && <span className="ml-2 text-sm text-slate-500">{unit}</span>}
    </div>
  </div>
);

const InputForm: React.FC<InputFormProps> = ({ userInput, onInputChange, onSubmit, isLoading, onReset }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-700 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Enter Your Daily Data
      </h2>

      <div className="space-y-6">
        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-lg text-slate-600 mb-3">Lifestyle Routine</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Wake-up Time" name="wakeUpTime" type="time" value={userInput.wakeUpTime} onChange={onInputChange} />
            <InputField label="Sleep Time" name="sleepTime" type="time" value={userInput.sleepTime} onChange={onInputChange} />
            <InputField label="Total Sleep" name="totalSleepHours" type="number" value={userInput.totalSleepHours} onChange={onInputChange} unit="hours" step="0.1" />
            <InputField label="Water Intake" name="waterIntake" type="number" value={userInput.waterIntake} onChange={onInputChange} unit="glasses" />
            <InputField label="Exercise" name="exerciseMinutes" type="number" value={userInput.exerciseMinutes} onChange={onInputChange} unit="minutes" />
            <InputField label="Steps" name="steps" type="number" value={userInput.steps} onChange={onInputChange} unit="steps" />
            <InputField label="Stress Level (0-10)" name="stressLevel" type="number" value={userInput.stressLevel} onChange={onInputChange} min="0" max="10" />
             <div>
                <label htmlFor="mood" className="block text-sm font-medium text-slate-600 mb-1">Mood</label>
                <select
                    id="mood"
                    name="mood"
                    value={userInput.mood}
                    onChange={onInputChange}
                    className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                >
                    <option>Neutral</option>
                    <option>Happy</option>
                    <option>Sad</option>
                    <option>Stressed</option>
                    <option>Tired</option>
                    <option>Energetic</option>
                    <option>Calm</option>
                </select>
            </div>
          </div>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg">
          <h3 className="font-semibold text-lg text-slate-600 mb-3">Medical Readings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Blood Pressure (SYS)" name="bp.sys" type="number" value={userInput.bp.sys} onChange={onInputChange} unit="mmHg" />
            <InputField label="Blood Pressure (DIA)" name="bp.dia" type="number" value={userInput.bp.dia} onChange={onInputChange} unit="mmHg" />
            <InputField label="Fasting Blood Sugar" name="sugar.fasting" type="number" value={userInput.sugar.fasting} onChange={onInputChange} unit="mg/dL" />
            <InputField label="Post-Meal Blood Sugar" name="sugar.pp" type="number" value={userInput.sugar.pp} onChange={onInputChange} unit="mg/dL" />
            <InputField label="Heart Rate" name="heartRate" type="number" value={userInput.heartRate} onChange={onInputChange} unit="bpm" />
            <InputField label="Oxygen Saturation" name="oxygen" type="number" value={userInput.oxygen} onChange={onInputChange} unit="%" />
            <InputField label="Weight" name="weight" type="number" value={userInput.weight} onChange={onInputChange} unit="kg" step="0.1" />
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end space-x-3">
        <button type="button" onClick={onReset} disabled={isLoading} className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 border border-transparent rounded-md hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed">
            Reset
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-teal-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze My Day'
          )}
        </button>
      </div>
    </form>
  );
};

export default InputForm;
