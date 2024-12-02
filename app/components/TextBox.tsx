"use client";

import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { SubmitButton } from "./SubmitButton";
import generateContent from "../server/generateContent";

const TextBox = () => {
  const [keyPhrase, setKeyPhrase] = useState("");
  const [existingContent, setExistingContent] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleKeyPhraseChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setKeyPhrase(event.target.value);
    if (event.target.value.trim() !== "") {
      setCurrentStep(2);
    }
  };

  const handleExistingContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setExistingContent(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Call the generateContent function to get API response
      const generatedData = await generateContent(keyPhrase);

      // Populate the text boxes with API response data
      setMetaDescription(
        generatedData.metaDescription || "Meta description not available."
      );
      setContent(generatedData.content || "Content not available.");
      setImage(
        generatedData.imageIdeas
          ? generatedData.imageIdeas.join("\n") // Format image ideas into a readable list
          : "No image ideas available."
      );

      setCurrentStep(5); // Move to the "Refine" step
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <div className="w-full flex justify-center mb-5">
        <ProgressBar currentStep={currentStep}></ProgressBar>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
        <textarea
          placeholder="Type Your Key Phrase Here & Click Submit"
          className="textarea textarea-bordered textarea-lg w-full h-28"
          value={keyPhrase}
          onChange={handleKeyPhraseChange}
        ></textarea>

        <textarea
          placeholder="Pre-Existing Content"
          className="textarea textarea-bordered textarea-lg w-full h-28"
          value={existingContent}
          onChange={handleExistingContentChange}
        ></textarea>

        <textarea
          placeholder="Meta Description"
          className="textarea textarea-bordered textarea-lg w-full h-24"
          value={metaDescription}
          readOnly
        ></textarea>

        <textarea
          placeholder="Content"
          className="textarea textarea-bordered textarea-lg w-full h-40"
          value={content}
          readOnly
        ></textarea>

        <textarea
          placeholder="Images"
          className="textarea textarea-bordered textarea-lg w-full h-40"
          value={image}
          readOnly
        ></textarea>
      </div>
      <div className="flex justify-end w-full max-w-4xl ">
        <SubmitButton onSubmit={handleSubmit}></SubmitButton>
      </div>
    </div>
  );
};

export default TextBox;
