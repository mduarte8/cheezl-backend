import db from "../data/dbSetup.js";
import cheeses from "../data/cheeses.js";

function getRandomCheeses() {
  let chosenCheeses = [];
  let cheeseArray = [...cheeses]; // create a copy to not mutate original array

  for (let i = 0; i < 3; i++) {
    let randomIndex = Math.floor(Math.random() * cheeseArray.length);
    chosenCheeses.push(cheeseArray[randomIndex]);
    cheeseArray.splice(randomIndex, 1);
  }

  return chosenCheeses;
}

async function generateDailyCheeses(date) {
  await db.read();

  if (!db.data.cheeses[date]) {
    db.data.cheeses[date] = getRandomCheeses();
    await db.write();
  }
  const cheeseChoices = db.data.cheeses[date];
  console.log("cheeseChoices are", cheeseChoices);
  return cheeseChoices;
}

async function checkForUserPlayed(userId) {
  console.log("in choices.service checking for userId", userId);
  await db.read();
  const today = new Date().toISOString().split("T")[0]; // gets the current date in YYYY-MM-DD
  console.log("today is", today);

  if (!db.data["users"]) {
    db.data.users = {};
    await db.write();
  }

  if (
    db.data.users &&
    db.data.users[userId] &&
    db.data.users[userId]["last-played"] === today
  ) {
    console.log("TRUE last-played is", db.data.users[userId]["last-played"]);
    return { hasPlayed: true, choices: db.data.users[userId]["choices"] };
  }

  console.log("FALSE! last-played is not today or user not found.");
  return { hasPlayed: false };
}

async function setUserHasPlayed(userId, choices) {
  const today = new Date().toISOString().split("T")[0]; // gets the current date in YYYY-MM-DD
  console.log("in setUserHasPlayed SERVICE with", userId);
  console.log("type of userId is", typeof userId);
  console.log("choices", choices);

  await db.read();
  if (!db.data.users[userId]) {
    db.data.users[userId] = {};
  }
  db.data.users[userId]["last-played"] = today;
  db.data.users[userId]["choices"] = choices;
  await db.write();
  const obj = {};
  obj[userId] = { "last-played": today, choices: choices };
  return obj;
}

export default { generateDailyCheeses, checkForUserPlayed, setUserHasPlayed };
