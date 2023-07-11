import asyncErrorBoundary from "../errors/asyncErrorBoundary.js";
import service from "./choices.service.js";

async function list(req, res) {
  const date = new Date().toISOString().split("T")[0]; // gets the current date in YYYY-MM-DD
  const data = await service.generateDailyCheeses(date);
  res.status(200).json({
    data,
  });
}

const listAsync = asyncErrorBoundary(list);

export { listAsync as list };
