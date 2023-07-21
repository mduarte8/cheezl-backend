import asyncErrorBoundary from "../errors/asyncErrorBoundary.js";
import service from "./choices.service.js";

export function getCurrentDateInPacificTime() {
  const date = new Date();
  //   console.log("date is", date);
  //   const offsetFromUTC = date.getTimezoneOffset();
  //   console.log("offsetfromUTC is", offsetFromUTC);
  const pacificOffset = 420; // PDT offset
  date.setMinutes(date.getMinutes() - pacificOffset);
  //   console.log("date is now", date);
  return date.toISOString().split("T")[0];
}

async function list(req, res) {
  //   const date = new Date().toISOString().split("T")[0]; // gets the current date in YYYY-MM-DD
  const date = getCurrentDateInPacificTime();
  //   console.log("checking cheeses for", date);
  const data = await service.generateDailyCheeses(date);
  res.status(200).json({
    data,
  });
}

function reqHasUserId(req, res, next) {
  const { userId } = req.body.data || req.query;
  //   console.log("userId is", userId);
  //   console.log("reqHasUserId is being called!!");
  if (!userId) {
    next({
      status: 400,
      message: "Request must include a userId",
    });
  } else {
    res.locals.userId = userId;
    next();
  }
}

async function read(req, res) {
  //   const today = new Date().toISOString().split("T")[0]; // gets the current date in YYYY-MM-DD
  const date = getCurrentDateInPacificTime();
  const { hasPlayed, choices } = await service.checkForUserPlayed(
    res.locals.userId
  );
  if (hasPlayed) {
    res.status(200).json({
      message: "User has played already come back tomorrow!",
      hasPlayedToday: true,
      choices,
    });
  } else {
    res.status(200).json({
      message: "User has not submitted a seleciton yet. Good to play.",
      hasPlayedToday: false,
    });
  }
}

async function add(req, res) {
  //   console.log("in setUserHasPlayed with", res.locals.userId);
  const { choices } = req.body.data;
  const data = await service.setUserHasPlayed(res.locals.userId, choices);
  res.status(201).json({
    data,
  });
}

const listAsync = asyncErrorBoundary(list);
const addArray = [reqHasUserId, asyncErrorBoundary(add)];
const readArray = [reqHasUserId, asyncErrorBoundary(read)];

export { listAsync as list, addArray as add, readArray as read };
