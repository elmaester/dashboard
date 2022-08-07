import getParseObject from "../../functions/Parse/getParseObject";
import ParseCollections from "../../types/ParseCollections";
import { Streak } from "../../types/Streak";

async function addNewDoneTime(_streak: Streak, time: number) {
  const streak = await getParseObject(_streak.id, ParseCollections.Streak);
  streak.set("done", [..._streak.done, time].sort());
  streak.save();
}

export default addNewDoneTime;
