import { Router } from "express";
import methodNotAllowed from "../errors/methodNotAllowed.js";
import { list, read, add } from "./choices.controller.js";

const router = Router();

router.route("/hasPlayedToday").get(read).post(add).all(methodNotAllowed);
router.route("/").get(list).all(methodNotAllowed);

export default router;
