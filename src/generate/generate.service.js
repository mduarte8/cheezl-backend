import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  //   organization: "org-FQ5BQ2fcFSkJKU12y8pzGg9T",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateText(prompt) {
  try {
    const openAIResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are responding to users cheese preference choices in Kill Date (where Date takes the place of the original F...) Marry game",
        },
        {
          role: "user",
          content: `${prompt}. Write terse judgemental and/or funny review of selections, compare to other users percentages selected for that combo, less than 20 words.`,
        },
      ],
      max_tokens: 50,
      temperature: 1,
    });
    const generatedText = openAIResponse.data.choices[0].message;
    return generatedText;
  } catch (error) {
    if (error.response) {
      console.log("error.response.status", error.response.status);
      console.log("error.response.data", error.response.data);
    } else {
      console.log("error.message", error.message);
    }
  }
}

export default { generateText };
