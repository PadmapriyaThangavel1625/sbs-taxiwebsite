
import React from "react";
import { Check } from "lucide-react";

interface StepTrackerProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: "Trip Details" },
  { id: 2, label: "Vehicle" },
  { id: 3, label: "Passenger Details" },
  { id: 4, label: "Payment" },
  { id: 5, label: "Confirm Ride" },
];

export default function StepTracker({
  currentStep,
}: StepTrackerProps) {
  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
      <div className="flex w-full items-start">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step */}
              <div className="flex min-w-0 flex-1 flex-col items-center">
                {/* Circle */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all sm:h-9 sm:w-9 sm:text-sm ${
                    isCompleted
                      ? "bg-emerald-600 text-white"
                      : isCurrent
                      ? "bg-[#1A365D] text-[#FFC107] shadow-md ring-4 ring-blue-50"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    step.id
                  )}
                </div>

                {/* Label */}
                <span
                  className={`mt-2 max-w-[75px] text-center text-[10px] leading-tight sm:max-w-none sm:text-xs md:text-sm ${
                    isCurrent
                      ? "font-bold text-slate-900"
                      : isCompleted
                      ? "font-medium text-emerald-600"
                      : "font-medium text-slate-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="flex flex-1 items-center px-1 pt-4 sm:px-2">
                  <div
                    className={`h-[2px] w-full rounded-full transition-colors ${
                      step.id < currentStep
                        ? "bg-emerald-600"
                        : "bg-slate-200"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
