import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  //   organization: "org-FQ5BQ2fcFSkJKU12y8pzGg9T",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateText(prompt) {
  //   console.timeLog("script", "START generate.service - 'generateText'");
  try {
    // console.log("i'm inside service...");
    // console.log("prompt is", prompt);
    // console.timeLog(
    //   "script",
    //   "START generate.service - 'openai.createChatCompletion'"
    // );
    const openAIResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are responding to users cheese preference choices in Kill Fuck Marry game",
        },
        {
          role: "user",
          content: `${prompt}. Write terse judgemental and/or funny review of selections, compare to other users percentages selected for that combo, less than 20 words.`,
        },
      ],
      max_tokens: 50,
      temperature: 1.5,
    });
    console.timeLog(
      "script",
      "END SUCCESSFUL generate.service - 'openai.createChatCompletion'"
    );
    const generatedText = openAIResponse.data.choices[0].message;
    // console.log("generatedText.content is", generatedText.content);
    return generatedText;
  } catch (error) {
    // console.timeLog(
    //   "script",
    //   "END FAILED generate.service - 'openai.createChatCompletion'"
    // );
    if (error.response) {
      console.log("error.response.status", error.response.status);
      console.log("error.response.data", error.response.data);
    } else {
      console.log("error.message", error.message);
    }
  }
  //   console.timeLog("script", "END generate.service - 'generateText'");
}

export default { generateText };
