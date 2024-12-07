import React from "react";

const ProgressBar = ({currentStep}:{currentStep: number}) => {
  return (
    <ul className="steps">
      <li className={`step ${currentStep >= 1 ? "step-primary" : ""}`}>Add Key Phrase</li>
      <li className={`step ${currentStep >= 2 ? "step-primary" : ""}`}>Generate Meta Description</li>
      <li className={`step ${currentStep >= 3 ? "step-primary" : ""}`}>Generate Blog Content</li>
      <li className={`step ${currentStep >= 4 ? "step-primary" : ""}`}>Generate Image Ideas</li>
      <li className={`step ${currentStep >= 5 ? "step-primary" : ""}`}>Refine</li>
    </ul>
  );
};

export default ProgressBar;
