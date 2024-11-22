'use client'

import React, {useState} from "react";
import ProgressBar from "./ProgressBar";
import { SubmitButton } from "./SubmitButton";

const TextBox = () => {

  const [keyPhrase, setKeyPhrase] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const handleKeyPhraseChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setKeyPhrase(event.target.value);
  }

  const handleSubmit = () => {
    const generatedMetaDescription = `This is a great article about ${keyPhrase}. It provides insights and useful information to help you understand more about ${keyPhrase}.`;

    setMetaDescription(generatedMetaDescription);
    console.log('Submitted Key Phrase:', keyPhrase);
    console.log('Generated Meta Description:', generatedMetaDescription);
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
        value={metaDescription}
        readOnly
      ></textarea>

      <textarea
        placeholder="Content"
        className="textarea textarea-bordered textarea-md w-full max-w-xs"
        readOnly
      ></textarea>
      <textarea
        placeholder="Images"
        className="textarea textarea-bordered textarea-lg w-full max-w-xs"
        readOnly
      ></textarea>
      <div className="flex justify-end w-full max-w-xs">
      <SubmitButton onSubmit={handleSubmit}></SubmitButton>
      </div>
    </div>
  );
};

export default TextBox;
