import asyncErrorBoundary from "../errors/asyncErrorBoundary.js";
import service from "./analyze.service.js";

async function list(req, res) {
  const { cheeseKey } = req.query;
  const data = await service.list(cheeseKey);
  res.status(200).json({
    data,
  });
}

async function add(req, res) {
  const newEntry = await service.addStat(req.body);
  res.status(201).json({
    data: newEntry,
  });
}

const listAsync = asyncErrorBoundary(list);
const addAsync = asyncErrorBoundary(add);

export { listAsync as list, addAsync as add };
