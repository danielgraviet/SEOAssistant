'use client'
import React, {useState} from "react";

export const SubmitButton = ({onSubmit}: {onSubmit: () => void }) => {

  const [isLoading, setIsLoading] =  useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    onSubmit();
  

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  }

  return (


    <div>
      <button className="btn btn-accent btn-lg px-8 py-4 text-lg rounded-lg" onClick={handleSubmit} disabled={isLoading}>
      {isLoading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          'Submit'
        )}
      </button>
    </div>
  );
};
