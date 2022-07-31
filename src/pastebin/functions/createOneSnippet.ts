import Parse from "parse";

async function createOneSnippet(text: string) {
  const Snippet = Parse.Object.extend("Snippet");
  const snippet = new Snippet();
  snippet.set("text", text);
  snippet.save();
}

export default createOneSnippet;
