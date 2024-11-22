'use client'

import React, {useState} from "react";
import ProgressBar from "./ProgressBar";
import { SubmitButton } from "./SubmitButton";

const TextBox = () => {

  const [keyPhrase, setKeyPhrase] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const handleKeyPhraseChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setKeyPhrase(event.target.value);
    if (event.target.value.trim() !== "") {
      setCurrentStep(2);
    }
  }

  const handleSubmit = () => {
    if (currentStep < 3) {
      setCurrentStep(3); // Progress to generating blog content
    }

    const generatedMetaDescription = `This is a great article about ${keyPhrase}. It provides insights and useful information to help you understand more about ${keyPhrase}.`;

    if (currentStep < 4) {
      setCurrentStep(4); // Simulate moving to image generation step
    }

    const generatedContent = `This content is about ${keyPhrase}. Conclusion: Protect Your Rights After a Dog Bite A dog bite can have serious consequences, both physically and emotionally. Understanding your rights and knowing what steps to take can make a big difference in the outcome of your claim. If you have questions or want to pursue a claim, consulting an experienced dog bite attorney can help ensure you receive fair compensation for your injuries. If you’ve been bitten by a dog in Utah, contact personal injury attorney Jacob S. Gunter at (801) 373-6345 for a free consultation. He’ll review your case, explain your options, and advocate for your rights.`;

    const generatedImage = `Here are some image ideas: ${keyPhrase}`;


    setMetaDescription(generatedMetaDescription);
    setContent(generatedContent);
    setImage(generatedImage);

    console.log('Submitted Key Phrase:', keyPhrase);
    console.log('Generated Meta Description:', generatedMetaDescription);
    console.log('Generated Content:', generatedContent);
    console.log('Generated Image:', generatedImage);


  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <div className = "mb-5">
        <ProgressBar currentStep={currentStep}></ProgressBar>
      </div>
      <textarea
        placeholder="Type Your Key Phrase Here & Click Submit"
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
        value={content}
        readOnly
      ></textarea>
      <textarea
        placeholder="Images"
        className="textarea textarea-bordered textarea-lg w-full max-w-xs"
        value = {image}
        readOnly
      ></textarea>
      <div className="flex justify-end w-full max-w-xs">
      <SubmitButton onSubmit={handleSubmit}></SubmitButton>
      </div>
    </div>
  );
};

export default TextBox;
