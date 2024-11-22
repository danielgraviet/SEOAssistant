import axios from "axios";

const generateContent = async (keyPhrase: string) => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OpenAI API key is not set. Please check your .env file.");
  }

  const prompt = `
  Key Phrase: ${keyPhrase}

  Generate the following based on the key phrase:
  - A meta description under 150 characters.
  - Blog content using active voice with the key phrase implemented 4-6 times.
  - 2 Image ideas.

  Respond in this format:
  {
    "metaDescription": "Your meta description here under 100 characters",
    "content": "Your blog content here under 50 words",
    "image": "1 image idea"
  }
  `;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const completion = response.data.choices[0].message.content;
    return JSON.parse(completion); // Parse the structured response
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};

export default generateContent;
