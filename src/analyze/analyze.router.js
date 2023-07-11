import { Router } from "express";
import methodNotAllowed from "../errors/methodNotAllowed.js";
import { list, add } from "./analyze.controller.js";

const router = Router();

router.route("/").get(list).put(add).all(methodNotAllowed);

export default router;
