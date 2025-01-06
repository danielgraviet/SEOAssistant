import axios from "axios";

const generateContent = async (keyPhrase: string, existingContent: string) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OpenAI API key is not set. Please check your .env file.");
  }

  const prompt = `
  Existing Content: ${existingContent}
  Using this Key Phrase: ${keyPhrase}, optimize this blog post for SEO.
  Include the key phrase in the first paragraph, and add transition words, H1 and H2 headers.
  Make the content easy to read, include tips and actionable items. Keep sentence length under 20 words.
  The final blog post should be around 500 words long. 
  Also create a meta description under 150 characters that includes the key phrase at the beginning.
  Finally Create 5 meta tags to improve SEO. 

  Respond strictly in valid JSON format like this:
  {
    "metaDescription": "Your meta description here under 100 characters",
    "content": "Your blog content here",
    "tags": "tag 1, tag 2, tag3, tag4, tag5"
  }
`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    let completion = response.data.choices[0].message.content;
    console.log("Raw API Response:", completion);

    // Sanitize and parse the response
    completion = completion.replace(/[\u0000-\u001F\u007F-\u009F]/g, ""); // Remove control characters
    const parsedData = JSON.parse(completion); // Parse JSON

    return parsedData;
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate content.");
  }
};

export default generateContent;
