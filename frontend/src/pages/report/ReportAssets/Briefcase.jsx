import { ClipPath, Defs, G, Path, Rect, Svg } from "@react-pdf/renderer";
import React from "react";

const Briefcase = () => {
  return (
    <Svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M4.3125 1.125H7.6875C7.79063 1.125 7.875 1.20938 7.875 1.3125V2.25H4.125V1.3125C4.125 1.20938 4.20937 1.125 4.3125 1.125ZM3 1.3125V2.25H1.5C0.672656 2.25 0 2.92266 0 3.75V6H4.5H7.5H12V3.75C12 2.92266 11.3273 2.25 10.5 2.25H9V1.3125C9 0.588281 8.41172 0 7.6875 0H4.3125C3.58828 0 3 0.588281 3 1.3125ZM12 6.75H7.5V7.5C7.5 7.91484 7.16484 8.25 6.75 8.25H5.25C4.83516 8.25 4.5 7.91484 4.5 7.5V6.75H0V9.75C0 10.5773 0.672656 11.25 1.5 11.25H10.5C11.3273 11.25 12 10.5773 12 9.75V6.75Z"
        fill="#00CC9C"
      />
    </Svg>
  );
};

export default Briefcase;
