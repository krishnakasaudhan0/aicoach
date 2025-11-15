
import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-800 p-4 rounded-md shadow-sm" role="alert">
      <div className="flex">
        <div className="py-1">
          <svg className="fill-current h-6 w-6 text-amber-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293zM10 4a.75.75 0 01.75.75v.01a.75.75 0 01-1.5 0v-.01A.75.75 0 0110 4z" />
          </svg>
        </div>
        <div>
          <p className="font-bold">Medical Disclaimer</p>
          <p className="text-sm">
            This AI provides insights for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for any medical concerns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
