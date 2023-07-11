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

export default { generateDailyCheeses };
