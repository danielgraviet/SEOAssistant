'use client'
import React, { useState } from "react";

export const SubmitButton = ({ onSubmit }: { onSubmit: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log("Loaded API Key:", process.env.OPENAI_API_KEY); // Debugging API key loading

    try {
      await onSubmit(); // Ensure `onSubmit` handles async logic properly
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <button
        className="btn btn-accent btn-lg px-8 py-4 text-lg rounded-lg"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
};
