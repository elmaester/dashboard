import { SortedStreaksObject, StreakType } from "./../../types/Streak";
import Parse from "parse";

async function fetchAllStreaks(setStreaks: Function) {
  const parseStreak = (obj: any) => ({
    id: obj.id,
    name: obj.attributes.name,
    icon: obj.attributes.icon,
    done: obj.attributes.done,
    type: obj.attributes.type,
    target: obj.attributes.target,
  });
  function refresh(data: any) {
    if (data) {
      const streaksArray = Object.values(data).map((obj) =>
        parseStreak(obj)
      );
      const streaks: any = {};
      streaksArray.forEach((streak: any) => {
        if(!streaks[streak.type]) streaks[streak.type] = [];
        streaks[streak.type].push(streak);
      })
      setStreaks(streaks);
    } else setStreaks([]);
  }
  const Streak = Parse.Object.extend("Streak");
  const query = new Parse.Query(Streak);
  query.ascending("createdAt");
  refresh(await query.find());
  const subscription = await query.subscribe();
  subscription.on("create", async (data) => {
    refresh(await query.find());
  });
  subscription.on("update", async (data) => {
    refresh(await query.find());
  });
  subscription.on("delete", async (data) => {
    refresh(await query.find());
  });
}

export default fetchAllStreaks;
