import axios from "axios";

const generateContent = async (keyPhrase: string, existingContent: string) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OpenAI API key is not set. Please check your .env file.");
  }

  const prompt = `
Existing Content: ${existingContent}
Using this Key Phrase: ${keyPhrase}, optimize this blog post for SEO.

- Format the blog content in **Markdown**:
  - Use # for H1 headings, ## for H2 headings, and ### for H3 headings.
  - Add line breaks between headings, paragraphs, and lists.
- Include the key phrase in the first paragraph and throughout the content where appropriate.
- Add transition words, tips, and actionable items to make the content engaging and easy to read.
- Keep sentence length under 20 words, and the overall content length around 500 words.
- Create a meta description under 150 characters with the key phrase at the beginning.
- Provide 5 meta tags to improve SEO.

Respond strictly in valid JSON format like this:
{
  "metaDescription": "Your meta description here under 150 characters",
  "content": "Your blog content here in proper Markdown format",
  "tags": "tag1, tag2, tag3, tag4, tag5"
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
