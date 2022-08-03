import Parse from "parse";
import { Streak } from "../../types/Streak";
import findStreakById from "./findStreakById";

async function updateStreak(id: string, changeObj: Object) {
  const streak = await findStreakById(id);
  for (let entry of Object.entries(changeObj)) {
    console.log(entry);
    streak.set(entry[0], entry[1]);
  }
  streak.save();
}

export default updateStreak;
