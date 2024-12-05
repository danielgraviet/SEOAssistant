import axios from "axios";

const generateContent = async (keyPhrase: string) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OpenAI API key is not set. Please check your .env file.");
  }

  const prompt = `
  Key Phrase: ${keyPhrase}

  Create an optimized blog post for SEO using the key phrase:
  - it should be at least 300 words, include the key phrase 4-6 times, use active voice, and include h1 and h2 headers for improved readablitity.

  Create a meta description under 150 characters that includes the key phrase.

  Create 5 meta tags to improve SEO. 

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
