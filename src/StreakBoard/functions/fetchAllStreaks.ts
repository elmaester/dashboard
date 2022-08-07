import Parse from "parse";
import subscribeToQuery from "../../functions/Parse/subscribeToQuery";
import ParseCollections from "../../types/ParseCollections";

const processFunc = (allCollectionItems: Array<any>) => {
  const streaks: any = {};
  allCollectionItems.forEach((streak: any) => {
    if (!streaks[streak.type]) streaks[streak.type] = [];
    streaks[streak.type].push(streak);
  });
  return streaks;
};

async function fetchAllStreaks(setReactState: Function) {
  const query = new Parse.Query(ParseCollections.Streak);
  query.ascending("createdAt");
  subscribeToQuery(query, setReactState, processFunc);
}

export default fetchAllStreaks;
