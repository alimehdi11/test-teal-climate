import { useMemo } from "react";

const FrameComponent2 = ({ fuelCategory, propHeight }) => {
  const fuelCategoryStyle = useMemo(() => {
    return {
      height: propHeight,
    };
  }, [propHeight]);

  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-[12px] text-left text-base text-dark font-poppins">
      <h3
        className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]"
        style={fuelCategoryStyle}
      >
        {fuelCategory}
      </h3>
      <div className="self-stretch rounded-lg bg-not-white overflow-hidden flex flex-row items-end justify-between py-2 px-3 gap-[20px] whitespace-nowrap z-[1] text-sm text-gray-200">
        <div className="relative">Select Option</div>
        <img
          className="h-6 w-6 relative min-h-[24px]"
          alt=""
          src="/business-unit.svg"
        />
      </div>
    </div>
  );
};

export default FrameComponent2;
