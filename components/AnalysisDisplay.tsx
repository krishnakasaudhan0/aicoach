
import React from 'react';
import type { AnalysisResult, RoutineAnalysis, MedicalAnalysis } from '../types';

interface AnalysisDisplayProps {
  result: AnalysisResult;
}

const AnalysisCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
    <h3 className="text-lg font-semibold text-slate-700 mb-2">{title}</h3>
    <div className="text-sm text-slate-600 space-y-1">{children}</div>
  </div>
);

const ListItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <p><span className="font-semibold">{label}:</span> {value}</p>
);

const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="list-disc list-inside space-y-1">
    {items.map((item, index) => <li key={index}>{item}</li>)}
  </ul>
);

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result }) => {
  const { routineAnalysis, medicalAnalysis, lifestyleCorrelations, overallSummary, suggestions } = result;

  return (
    <div className="space-y-6 animate-fade-in">
      <AnalysisCard title="Overall Summary">
        <p className="text-base">{overallSummary}</p>
      </AnalysisCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnalysisCard title="Routine Analysis">
            {Object.entries(routineAnalysis).map(([key, value]) => {
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                return <ListItem key={key} label={label} value={value} />;
            })}
        </AnalysisCard>

        <AnalysisCard title="Medical Analysis">
            {Object.entries(medicalAnalysis).map(([key, value]) => {
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                return <ListItem key={key} label={label} value={value} />;
            })}
        </AnalysisCard>
      </div>
      
      <AnalysisCard title="Lifestyle Correlations">
        <BulletList items={lifestyleCorrelations} />
      </AnalysisCard>

      <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg">
        <h3 className="text-lg font-semibold text-teal-800 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Actionable Suggestions
        </h3>
        <div className="text-teal-700 text-sm">
            <BulletList items={suggestions} />
        </div>
      </div>
    </div>
  );
};

export default AnalysisDisplay;
