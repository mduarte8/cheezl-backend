import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "../data/db.json");

const adapter = new JSONFile(file);
const defaultData = { stats: { choices: {}, percentages: {} } };
const db = new Low(adapter, defaultData);

async function addStat(newEntry) {
  await db.read();
  const key = Object.keys(newEntry)[0];
  const selections = Object.values(newEntry)[0];
  const choices = Object.keys(selections);
  const cheeses = Object.values(selections);

  if (!db.data.stats.choices[key]) {
    db.data.stats.choices[key] = {};
    db.data.stats.percentages[key] = {};
    cheeses.forEach((cheese) => {
      db.data.stats.choices[key][cheese] = {
        Kill: 0,
        Date: 0, // CHANGE THIS
        Marry: 0,
        Total: 0,
      };
      db.data.stats.percentages[key][cheese] = {
        Kill: 0,
        Date: 0, // CHANGE THIS
        Marry: 0,
      };
    });
  }
  cheeses.forEach((cheese) => {
    choices.forEach((choice) => {
      if (selections[choice] === cheese) {
        db.data.stats.choices[key][cheese][choice] =
          db.data.stats.choices[key][cheese][choice] + 1;
        db.data.stats.choices[key][cheese]["Total"] =
          db.data.stats.choices[key][cheese]["Total"] + 1;
      }
    });
    choices.forEach((choice) => {
      db.data.stats.percentages[key][cheese][choice] = Math.round(
        (100 * db.data.stats.choices[key][cheese][choice]) /
          db.data.stats.choices[key][cheese]["Total"]
      );
    });
  });

  // const writeResult = await db.write();
  await db.write();

  return db.data.stats.choices[key];
}

async function list(key) {
  await db.read();
  const returnValue = db.data.stats.percentages[key];
  return returnValue;
}

export default { list, addStat };
