import Parse from "parse";
import Snippet from "../../types/Snippet";

async function fetchAllSnippets(setSnippets: Function) {
  const parseSnippet = (obj: any) => ({
    id: obj.id,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
    text: obj.attributes.text,
  });
  function refresh(data: any) {
    if (data) {
      const snippets: Snippet[] = Object.values(data).map((obj: any) =>
        parseSnippet(obj)
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
