import Parse from "parse";
import { Streak } from "../../types/Streak";

async function addNewDoneTime(_streak: Streak, time: number) {
  const Streak = Parse.Object.extend("Streak");
  const query = new Parse.Query(Streak);
  query.equalTo("objectId", _streak.id);
  const [streak] = await query.find();
  streak.set("done", [..._streak.done, time]);
  streak.save();
}

export default addNewDoneTime;
