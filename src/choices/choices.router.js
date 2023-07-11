import { Router } from "express";
import methodNotAllowed from "../errors/methodNotAllowed.js";
import { list } from "./choices.controller.js";

const router = Router();

router.route("/").get(list).all(methodNotAllowed);

export default router;
