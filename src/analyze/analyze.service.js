import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "../data/db.json");

const adapter = new JSONFile(file);
const defaultData = { stats: { choices: {}, percentages: {} } };
const db = new Low(adapter, defaultData);

// async function initializeDB() {
//   await db.read();
//   // Use lodash (installed along with lowdb) to assign defaults
//   db.data ||= defaultData;
//   await db.write();
// }
// initializeDB();

async function list(key) {
  // console.timeLog(
  //   "script",
  //   "START analyze.service - 'list' (before await db.read()"
  // );
  await db.read();
  // console.log("key is", key);
  // console.log("db is", db.data);
  // console.log(
  //   "db.data.stats.percentages[key] is...",
  //   db.data.stats.percentages[key]
  // );
  const returnValue = db.data.stats.percentages[key];
  // console.timeLog("script", "END analyze.service - Ending 'list'");
  return returnValue;
}

async function addStat(newEntry) {
  // console.timeLog("script", "START analyze.service - 'addStat'");
  await db.read();

  // console.log("newEntry is", newEntry);
  // console.log("db.data.stats.choices is", db.data.stats.choices);
  const key = Object.keys(newEntry)[0];
  // console.log("key is", key);
  const selections = Object.values(newEntry)[0];
  // console.log("selections is", selections);
  const choices = Object.keys(selections);
  // console.log("choices are", choices);
  const cheeses = Object.values(selections);
  // console.log("cheeses is", cheeses);

  // console.log("db.data.stats.choices[key] is", db.data.stats.choices[key]);
  // selections.forEach((selection) => {
  //   console.log("selection is", selection);
  // });
  const testVar = db.data.stats.choices[key];

  if (!db.data.stats.choices[key]) {
    db.data.stats.choices[key] = {};
    db.data.stats.percentages[key] = {};
    // console.log("at least got here...");
    cheeses.forEach((cheese) => {
      // console.log("cheese loop!", cheese);
      db.data.stats.choices[key][cheese] = {
        Kill: 0,
        Fuck: 0,
        Marry: 0,
        Total: 0,
      };
      // console.log("hmm did this");
      db.data.stats.percentages[key][cheese] = {
        Kill: 0,
        Fuck: 0,
        Marry: 0,
      };
      // console.log("and then this??");
    });
    // console.log(
    //   "db.data.stats.choices[key] is now",
    //   db.data.stats.choices[key]
    // );
  }

  cheeses.forEach((cheese) => {
    choices.forEach((choice) => {
      if (selections[choice] === cheese) {
        // console.log("made it here for", cheese, choice);
        db.data.stats.choices[key][cheese][choice] =
          db.data.stats.choices[key][cheese][choice] + 1;
        db.data.stats.choices[key][cheese]["Total"] =
          db.data.stats.choices[key][cheese]["Total"] + 1;
      }
    });
    choices.forEach((choice) => {
      // console.log("now percentages for", cheese, choice);
      db.data.stats.percentages[key][cheese][choice] = Math.round(
        (100 * db.data.stats.choices[key][cheese][choice]) /
          db.data.stats.choices[key][cheese]["Total"]
      );
    });
  });

  // console.log(
  //   "db.data.stats.choices[key] after data add is",
  //   db.data.stats.choices[key]
  // );

  // {
  //   "cheddar-gouda-pepper_jack" : {
  //     "cheddar": {
  //       "kill": 1,
  //       "fuck": 2,
  //       "marry": 0,
  //     },
  //     "gouda": {
  //       kill: 1,
  //       fuck: 1,
  //       marry: 1
  //     },
  //     pepper_jack: {
  //       "kill":0,
  //       "fuck":0,
  //       "marry":3,
  //     }
  //   }
  // }
  const writeResult = await db.write();
  // console.log(writeResult);
  // console.timeLog(
  //   "script",
  //   "END analyze.service - 'addStat' (after await db.write())"
  // );
  return db.data.stats.choices[key];
}

export default { list, addStat };
