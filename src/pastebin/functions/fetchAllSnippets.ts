import Parse from "parse";
import Snippet from "../../types/Snippet";

async function fetchAllSnippets(setSnippets: Function) {
  const Snippet = Parse.Object.extend("Snippet");
  const query = new Parse.Query(Snippet);
  const response = await query.find();
  if (response) {
    const snippets: Snippet[] = Object.values(response).map((obj) => ({
      id: obj.id,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
      text: obj.attributes.text,
    }));
    setSnippets(snippets);
  } else setSnippets([]);
}

export default fetchAllSnippets;
