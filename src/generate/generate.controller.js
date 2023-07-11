import asyncErrorBoundary from "../errors/asyncErrorBoundary.js";
import service from "./generate.service.js";

async function generateText(req, res) {
  const choices = req.body.data;
  const data = await service.generateText(choices);
  res.status(200).json({
    data,
  });
}

const generateAsync = asyncErrorBoundary(generateText);

export { generateAsync as generateText };
