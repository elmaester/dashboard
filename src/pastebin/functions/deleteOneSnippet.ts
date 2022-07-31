import Parse from "parse";

async function deleteOneSnippet(id: string) {
  const Snippet = Parse.Object.extend("Snippet");
  const query = new Parse.Query(Snippet);
  query.equalTo("objectId", id);
  const [snippet] = await query.find();
  await snippet.destroy();
}

export default deleteOneSnippet;
