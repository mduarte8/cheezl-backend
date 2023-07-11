import express from "express";
import cors from "cors";
import errorHandler from "./errors/errorHandler.js";
import notFound from "./errors/notFound.js";
import analyzeRouter from "./analyze/analyze.router.js";
import generateRouter from "./generate/generate.router.js";

// console.time("script", "start");

const app = express();

app.use(
  //   cors()
  cors({
    origin: "*", // <-- allow all origins
    methods: ["GET", "POST", "PUT", "OPTIONS"], // <-- allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // <-- allow these headers
  })
);
app.use(express.json());

app.use("/analyze", analyzeRouter);
app.use("/generate", generateRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
