import React from "react";

const TextBox = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <textarea
        placeholder="Key Phrase"
        className="textarea textarea-bordered textarea-xs w-full max-w-xs"
      ></textarea>

      <textarea
        placeholder="Meta Description"
        className="textarea textarea-bordered textarea-sm w-full max-w-xs"
      ></textarea>

      <textarea
        placeholder="Content"
        className="textarea textarea-bordered textarea-md w-full max-w-xs"
      ></textarea>
      <textarea
        placeholder="Images"
        className="textarea textarea-bordered textarea-lg w-full max-w-xs"
      ></textarea>
    </div>
  );
};

export default TextBox;
