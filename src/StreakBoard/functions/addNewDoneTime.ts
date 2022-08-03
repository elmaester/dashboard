import { Streak } from "../../types/Streak";
import findStreakById from "./findStreakById";

async function addNewDoneTime(_streak: Streak, time: number) {
  const streak = await findStreakById(_streak.id);
  streak.set("done", [..._streak.done, time].sort());
  streak.save();
}

export default addNewDoneTime;
