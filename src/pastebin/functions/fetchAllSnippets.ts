import Parse from "parse";
import convertParseObjToLocalType from "../../functions/Parse/convertParseObjToLocalType";
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
  const Snippet = Parse.Object.extend("Snippet");
  const query = new Parse.Query(Snippet);
  query.descending("createdAt");
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

export default fetchAllSnippets;
