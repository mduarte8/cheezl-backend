import asyncErrorBoundary from "../errors/asyncErrorBoundary.js";
import service from "./analyze.service.js";

async function list(req, res) {
  // console.timeLog("script", "START analyze.controller -'list'");
  const { cheeseKey } = req.query;
  // console.log("req.params is", req.query);
  const data = await service.list(cheeseKey);
  // console.timeLog("script", "END analyze.controller -'list'");
  res.status(200).json({
    data,
  });
}

async function add(req, res) {
  // console.time("script", "start in analyze.controller-'add'");
  // console.timeLog("script", "START analyze.controller - 'add'");
  // console.log("looking to add!!!");
  // console.log("req is", req);
  // console.log("req.body is", req.body);
  const newEntry = await service.addStat(req.body);
  // console.timeLog("script", "END analyze.controller - 'add'");
  res.status(201).json({
    data: newEntry,
  });
}

const listAsync = asyncErrorBoundary(list);
const addAsync = asyncErrorBoundary(add);

export { listAsync as list, addAsync as add };
// module.exports = {
//     list,
//     create: [
//       bodyDataHas("table_name"),
//       bodyDataHas("capacity"),
//       bodyDataValid,
//       asyncErrorBoundary(create),
//     ],
//     update: [
//       bodyDataHas("reservation_id"),
//       asyncErrorBoundary(tableExists),
//       asyncErrorBoundary(reservationExists),
//       tableIsValid,
//       canSeatReservation,
//       asyncErrorBoundary(seat),
//     ]
//   };
