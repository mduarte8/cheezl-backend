import asyncErrorBoundary from "../errors/asyncErrorBoundary.js";
import service from "./generate.service.js";

async function generateText(req, res) {
  //   console.timeLog("script", "START generate.controller - 'generateText'");
  //   const { prompt } = req.body;
  //   console.log("req.body is", req.body);
  const choices = req.body.data;

  // "Write short clever hello world response, fit within token limit";
  //   const data = {
  //     generatedText: {
  //       role: "assistant",
  //       content: '"Hello Cheese Lovers!"',
  //     },
  //   };
  //   console.log("at least i'm getting here...");
  const data = await service.generateText(choices);
  //   console.log("do i get here???");
  //   console.log("data is", data);
  //   console.timeLog("script", "END generate.controller - 'generateText'");
  //   console.timeEnd("script", "End script");
  res.status(200).json({
    // success: true,
    data,
  });
}

const generateAsync = asyncErrorBoundary(generateText);

export { generateAsync as generateText };
