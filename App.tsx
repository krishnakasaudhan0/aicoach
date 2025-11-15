
import React, { useState, useCallback } from 'react';
import type { UserInput, AnalysisResult } from './types';
import { getHealthAnalysis } from './services/geminiService';
import InputForm from './components/InputForm';
import AnalysisDisplay from './components/AnalysisDisplay';
import Loader from './components/Loader';
import Disclaimer from './components/Disclaimer';
import { initialUserInput } from './constants';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<UserInput>(initialUserInput);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const [section, field] = name.split('.');

    if (section === 'bp' || section === 'sugar') {
      setUserInput(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: type === 'number' ? parseFloat(value) || 0 : value,
        }
      }));
    } else {
      setUserInput(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || 0 : value,
      }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await getHealthAnalysis(userInput);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? `Failed to get analysis: ${err.message}` : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUserInput(initialUserInput);
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen font-sans text-slate-800 antialiased">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 2a1 1 0 00-1 1v1H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H9V3a1 1 0 00-1-1H7zM5 8h10v8H5V8zm2 2a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            <h1 className="text-xl md:text-2xl font-bold text-slate-700">Health Lifestyle Analysis AI</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Disclaimer />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          <InputForm 
            userInput={userInput}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onReset={handleReset}
          />
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-700 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              AI Analysis Report
            </h2>
            {isLoading && <Loader />}
            {error && <p className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</p>}
            {analysisResult && <AnalysisDisplay result={analysisResult} />}
            {!isLoading && !error && !analysisResult && (
              <div className="text-center py-16 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="mt-4">Your analysis will appear here once you submit your data.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Health Lifestyle Analysis AI. For informational purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
