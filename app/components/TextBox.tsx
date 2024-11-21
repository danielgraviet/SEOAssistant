'use client'

import React, {useState} from "react";
import ProgressBar from "./ProgressBar";
import { SubmitButton } from "./SubmitButton";

const TextBox = () => {

  const [keyPhrase, setKeyPhrase] = useState("");

  const handleKeyPhraseChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setKeyPhrase(event.target.value);
  }

  const handleSubmit = () => {
    console.log('Submitted Key Phrase:', keyPhrase);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <div className = "mb-5">
        <ProgressBar></ProgressBar>
      </div>
      <textarea
        placeholder="Key Phrase"
        className="textarea textarea-bordered textarea-xs w-full max-w-xs"
        value={keyPhrase}
        onChange={handleKeyPhraseChange}
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
      <div className="flex justify-end w-full max-w-xs">
      <SubmitButton onSubmit={handleSubmit}></SubmitButton>
      </div>
    </div>
  );
};

export default TextBox;
