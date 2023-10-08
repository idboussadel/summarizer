const { config } = require("dotenv");
config();
const OpenAIApi = require("openai");

const openAi = new OpenAIApi({
  apiKey: process.env.OPEN_AI_API_KEY,
});

exports.openAiCallText = async (input) => {
  const prompt = `Compose a comprehensive textual summary of the provided article, covering key concepts, major arguments, and supporting details. Craft the summary in paragraph form, ensuring that it retains the depth and nuance of the original content without unnecessary simplification or omission of vital information: \n${input}`;

  const response = await openAi.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 1000,
  });

  return response.choices[0].message.content;
};

exports.openAiCallBullets = async (input) => {
  const prompt = `Generate a detailed and concise bulleted summary of the given article, capturing key points, major arguments, and supporting details. Ensure that the bullet points provide enough information to convey the substance of the article without oversimplifying or omitting crucial details: \n${input}`;

  const response = await openAi.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 1000,
  });

  return response.choices[0].message.content;
};
