import Parse from "parse";
import subscribeToQuery from "../../functions/Parse/subscribeToQuery";
import ParseCollections from "../../types/ParseCollections";

async function fetchAllSnippets(setReactState: Function) {
  const Snippet = Parse.Object.extend(ParseCollections.Snippet);
  const query = new Parse.Query(Snippet);
  query.descending("createdAt");
  subscribeToQuery(query, setReactState);
}

export default fetchAllSnippets;
