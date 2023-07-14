import express from "express";
import cors from "cors";
import errorHandler from "./errors/errorHandler.js";
import notFound from "./errors/notFound.js";
import analyzeRouter from "./analyze/analyze.router.js";
import generateRouter from "./generate/generate.router.js";
import choicesRouter from "./choices/choices.router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/analyze", analyzeRouter);
app.use("/generate", generateRouter);
app.use("/choices", choicesRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
