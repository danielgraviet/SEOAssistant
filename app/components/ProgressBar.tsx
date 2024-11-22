import React from "react";

const ProgressBar = () => {
  return (
    <ul className="steps">
      <li className="step step-primary">Add Key Phrase</li>
      <li className="step step-primary">Generate Meta Description</li>
      <li className="step">Generate Blog Content</li>
      <li className="step">Generate Image Ideas</li>
      <li className="step">Refine</li>
    </ul>
  );
};

export default ProgressBar;
