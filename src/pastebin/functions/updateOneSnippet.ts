import Parse from "parse";

async function updateOneSnippet(id: string, text: string) {
  const Snippet = Parse.Object.extend("Snippet");
  const query = new Parse.Query(Snippet);
  query.equalTo("objectId", id);
  const [snippet] = await query.find();
  snippet.set("text", text);
  snippet.save();
}

export default updateOneSnippet;
