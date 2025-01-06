"use client";
import { ClipboardIcon } from "@heroicons/react/24/outline";

import React, { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import generateContent from "../server/generateContent";

const TextBox = () => {
  type CopyStatus = {
    metaDescription?: string;
    tags?: string;
    slug?: string;
    content?: string;
  };

  const [keyPhrase, setKeyPhrase] = useState("");
  const [existingContent, setExistingContent] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [currentPage, setCurrentPage] = useState(1); // Page tracking state
  const [_loading, setLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>({});

  const goToPage2ForTesting = () => {
    // Mock data
    setMetaDescription("This is a mock meta description for testing.");
    setContent("This is mock content for testing purposes.");
    setTags("test, mock, example");
    setSlug("testing-slug-example")
    setCurrentPage(2); // Navigate to Page 2
  };

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

  const logContent = () => {
    console.log(existingContent);
    console.log(keyPhrase);
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);

      console.log("Key Phrase: ", keyPhrase)
      console.log("Pre-Existing Content: ", existingContent)


      // Call the generateContent function to get API response
      const generatedData = await generateContent(keyPhrase, existingContent);

      // Populate the text boxes with API response data
      setMetaDescription(
        generatedData.metaDescription || "Meta description not available."
      );
      setContent(generatedData.content || "Content not available.");
      setTags(generatedData.tags || "No tags available.");
      setTags(generatedData.slug || "Slug not available.");


      setCurrentStep(5); // Move to the "Refine" step
      setCurrentPage(2); // Automatically go to the second page
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < 2) setCurrentPage(currentPage + 1);
  };

  const handleCopy = async (
    text: string,
    fieldName: "metaDescription" | "tags" | "slug" | "content"
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus((prev) => ({ ...prev, [fieldName]: "Copied!" }));
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [fieldName]: "Copy" }));
      }, 2000); // Reset the status after 2 seconds
    } catch (error) {
      console.error("Failed to copy text:", error);
      setCopyStatus((prev) => ({ ...prev, [fieldName]: "Failed" }));
    }
  };

  return (
    <div className="w-full">
      <button
        className="btn btn-outline btn-sm mb-4"
        onClick={goToPage2ForTesting}
      >
        Go to Page 2 (Mock Data)
      </button>
      
      {/* Main Content */}
      <div className="join grid grid-cols-1 justify-items-center">
        {currentPage === 1 && (
          <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
            {/* Page 1: Key Phrase and Pre-Existing Content */}
            <div>
              <h2 className="text-xl font-bold mb-2">Key Phrase</h2>
              <textarea
                placeholder="Type Your Key Phrase Here"
                className="textarea textarea-bordered textarea-sm w-full h-20"
                value={keyPhrase}
                onChange={handleKeyPhraseChange}
              ></textarea>
            </div>

            <div className="col-span-3">
              <h2 className="text-xl font-bold mb-2">Pre-Existing Content</h2>
              <textarea
                placeholder="Pre-Existing Content"
                className="textarea textarea-bordered textarea-lg w-full h-[30rem] md:h-[30rem]"
                value={existingContent}
                onChange={handleExistingContentChange}
              ></textarea>
            </div>
          </div>
        )}

        {currentPage === 2 && (
          <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
            {/* Page 2: Generated Meta Description, Content, and Tags */}
            <div>
              <h2 className="text-xl font-bold mb-2">Meta Description</h2>
              <textarea
                placeholder="Meta Description"
                className="textarea textarea-bordered textarea-sm w-full h-20"
                value={metaDescription}
                readOnly
              ></textarea>
              <button
                className="bottom-2 right-2 w-full btn btn-sm btn-circle btn-outline"
                onClick={() => handleCopy(metaDescription, "metaDescription")}
                title={copyStatus.metaDescription || "Copy"}
              >
                <ClipboardIcon className="h-5 w-5" />
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Tags</h2>
              <textarea
                placeholder="Tags"
                className="textarea textarea-bordered textarea-sm w-full h-20"
                value={tags}
                readOnly
              ></textarea>
              <button
                className="bottom-2 right-2 w-full btn btn-sm btn-circle btn-outline"
                onClick={() => handleCopy(tags, "tags")}
                title={copyStatus.tags || "Copy"}
              >
                <ClipboardIcon className="h-5 w-5" />
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Slug</h2>
              <textarea
                placeholder="Slug"
                className="textarea textarea-bordered textarea-sm w-full h-20"
                value={slug}
                readOnly
              ></textarea>
              <button
                className="bottom-2 right-2 w-full btn btn-sm btn-circle btn-outline"
                onClick={() => handleCopy(slug, "slug")}
                title={copyStatus.slug || "Copy"}
              >
                <ClipboardIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="col-span-3">
              <h2 className="text-xl font-bold mb-2">Content</h2>
              <textarea
                placeholder="Content"
                className="textarea textarea-bordered textarea-lg w-full h-[25rem] md:h-[25rem]"
                value={content}
                readOnly
              ></textarea>
              <button
                className="bottom-2 right-2 w-full btn btn-sm btn-circle btn-outline"
                onClick={() => handleCopy(content, "content")}
                title={copyStatus.content || "Copy"}
              >
                <ClipboardIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Pagination Buttons */}
        <div className="flex justify-between w-full max-w-4xl mt-4">
          {currentPage > 1 && (
            <button
              className="btn btn-accent btn-lg px-8 py-4 text-lg rounded-lg"
              onClick={goToPreviousPage}
            >
              Previous Page
            </button>
          )}
          {currentPage < 2 && (
            <SubmitButton onSubmit={handleSubmit}></SubmitButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextBox;
