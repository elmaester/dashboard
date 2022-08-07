import Parse from "parse";
import convertParseObjToLocalType from "../../functions/Parse/convertParseObjToLocalType";
import subscribeToQuery from "../../functions/Parse/subscribeToQuery";
import ParseCollections from "../../types/ParseCollections";

async function fetchAllStreaks(setStreaks: Function) {
  function refresh(data: any) {
    if (data) {
      const streaksArray = Object.values(data).map((obj: any) =>
        convertParseObjToLocalType(obj)
      );
      const streaks: any = {};
      streaksArray.forEach((streak: any) => {
        if (!streaks[streak.type]) streaks[streak.type] = [];
        streaks[streak.type].push(streak);
      });
      setStreaks(streaks);
    } else setStreaks([]);
  }
  const Streak = Parse.Object.extend(ParseCollections.Streak);
  const query = new Parse.Query(Streak);
  query.ascending("createdAt");
  subscribeToQuery(query, refresh);
}

export default fetchAllStreaks;
