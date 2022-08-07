import { useState, useEffect } from "react";
import Parse from "parse";
import SnippetComponent from "./components/SnippetComponent";
import SnippetType from "../types/Snippet";
import createParseObject from "../functions/Parse/createParseObject";
import ParseCollections from "../types/ParseCollections";
import subscribeToQuery from "../functions/Parse/subscribeToQuery";

const Pastebin = () => {
  const [text, setText] = useState("");
  const [snippets, setSnippets] = useState([] as SnippetType[]);

  async function UIsaveSnippet() {
    if (!!text.length) {
      await createParseObject(ParseCollections.Snippet, { text });
      await setText("");
    }
  }

  const query = new Parse.Query(ParseCollections.Snippet);
  query.descending("createdAt");

  useEffect(() => {
    subscribeToQuery(query, setSnippets);
  }, []);
  return (
    <div
      className="container has-text-centered py-6 px-2"
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
        onDoubleClick={() => UIsaveSnippet()}
      ></textarea>
      <div className="mt-4">
        {snippets.map((snip: SnippetType) => (
          <SnippetComponent key={snip.id} snippet={snip} />
        ))}
      </div>
    </div>
  );
};

export default Pastebin;
