import * as React from "react";
import fetchAllSnippets from "./functions/fetchAllSnippets";
import createOneSnippet from "./functions/createOneSnippet";
import SnippetComponent from "./components/SnippetComponent";
import SnippetType from "../types/Snippet";

const Pastebin = () => {
  const [text, setText] = React.useState("");
  const [snippets, _setSnippets] = React.useState([] as SnippetType[]);

  function setSnippets(snippets: SnippetType[]) {
    _setSnippets(snippets.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)));
  }

  async function UIsaveSnippet() {
    await createOneSnippet(text);
    await setText("");
  }

  React.useEffect(() => {
    fetchAllSnippets(setSnippets);
  }, []);
  return (
    <div className="has-background-light" style={{ minHeight: "945px" }}>
      <div
        className="container has-text-centered p-6"
        style={{ maxWidth: "800px" }}
      >
        <h1 className="title">Add new snippet to pastebin</h1>
        <textarea
          className="textarea block"
          name="snippet-input"
          id="snippet-input"
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.ctrlKey && e.key === "Enter" && UIsaveSnippet()}
        ></textarea>
        <div className="mt-4">
          {snippets.map((snip: SnippetType) => (
            <SnippetComponent key={snip.id} snippet={snip} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pastebin;
