import React from 'react';

interface StepTrackerProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: 'Trip Details' },
  { id: 2, label: 'Vehicle' },
  { id: 3, label: 'Passenger Details' },
  { id: 4, label: 'Payment' },
  { id: 5, label: 'Confirm Ride' },
];

export default function StepTracker({ currentStep }: StepTrackerProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between overflow-x-auto">
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isCurrent = step.id === currentStep;

        return (
          <div key={step.id} className="flex items-center flex-1 min-w-[140px]">
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                  isCurrent
                    ? 'bg-[#1A365D] text-amber-400 shadow-md ring-4 ring-blue-50'
                    : isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {step.id}
              </div>
              <span
                className={`text-sm font-medium whitespace-nowrap ${
                  isCurrent ? 'text-slate-900 font-semibold' : 'text-slate-500'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-[2px] bg-slate-200 mx-4 hidden sm:block" />
            )}
          </div>
        );
      })}
    </div>
  );
}