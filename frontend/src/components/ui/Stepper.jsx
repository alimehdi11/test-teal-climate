import { useEffect, useRef, useState } from "react";

const Stepper = ({ steps = [], currentStep = 1 }) => {
  if (steps.length === 0) return null; // Return null when no steps are provided

  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  const calculateProgressBarWidth = () => {
    // Calculate progress width based on current step and total steps
    return ((currentStep - 1) / (steps.length - 1)) * 100; // Zero-indexed calculation
  };

  useEffect(() => {
    // Recalculate margins after steps are rendered
    if (stepRef.current.length > 0) {
      const leftMargin = stepRef.current[0]?.offsetWidth / 2 || 0;
      const rightMargin = stepRef.current[steps.length - 1]?.offsetWidth / 2 || 0;
      setMargins({
        marginLeft: leftMargin,
        marginRight: rightMargin,
      });
    }
  }, [steps.length, currentStep]); // Re-run on step count or currentStep changes

  return (
    <div className="relative flex justify-between items-center my-5 w-full max-w-[500px]">
      {steps.map((step, index) => (
        <div
          ref={(el) => (stepRef.current[index] = el)}
          key={step.title}
          className="flex flex-col gap-2 items-center relative text-sm"
        >
          <div
            className={`w-9 h-9 rounded-full border border-gray-400 bg-white flex items-center justify-center z-20 ${
              currentStep === index + 1
                ? "!bg-tc-blue text-white"  // Current step (blue)
                : currentStep > index + 1
                ? "!bg-tc-green text-white" // Completed step (green)
                : ""  // Default style for uncompleted steps
            }`}
          >
            {currentStep > index + 1 ? (
              <span className="text-[16px]">&#10003;</span> // Checkmark for completed steps
            ) : (
              index + 1
            )}
          </div>
          <div>{step.title}</div>
        </div>
      ))}
      
      <div
        className="progress-bar absolute top-[25%] left-0 h-[3px] bg-gray-300"
        style={{
          width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
          marginLeft: margins.marginLeft,
          marginRight: margins.marginRight,
        }}
      >
        <div
          className="progress h-full bg-tc-green transition-all ease-in-out"
          style={{
            width: `${calculateProgressBarWidth()}%`,
            transitionDuration: "0.2s",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Stepper;
