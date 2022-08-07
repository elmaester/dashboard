import Parse from "parse";
import convertParseObjToLocalType from "../../functions/Parse/convertParseObjToLocalType";
import subscribeToQuery from "../../functions/Parse/subscribeToQuery";
import ParseCollections from "../../types/ParseCollections";
import Snippet from "../../types/Snippet";

async function fetchAllSnippets(setSnippets: Function) {
  function refresh(data: any) {
    if (data) {
      const snippets: Snippet[] = Object.values(data).map((obj: any) =>
        convertParseObjToLocalType(obj)
      );
      setSnippets(snippets);
    } else setSnippets([]);
  }
  const Snippet = Parse.Object.extend(ParseCollections.Snippet);
  const query = new Parse.Query(Snippet);
  query.descending("createdAt");
  subscribeToQuery(query, refresh);
}

export default fetchAllSnippets;
