import { Router } from "express";
import methodNotAllowed from "../errors/methodNotAllowed.js";
import { generateText } from "./generate.controller.js";

const router = Router();

router.route("/").post(generateText).all(methodNotAllowed);

export default router;
