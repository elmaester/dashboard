import { useState } from "react";
import SnippetType from "../../types/Snippet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import deleteParseObject from "../../functions/Parse/deleteParseObject";
import ParseCollections from "../../types/ParseCollections";
import updateParseObject from "../../functions/Parse/updateParseObject";

interface Props {
  snippet: SnippetType;
}

const SnippetComponent = ({ snippet }: Props) => {
  const { createdAt, text } = snippet;
  const dateString = `${new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "medium",
  }).format(new Date(createdAt))}`;
  const [showAll, setShowAll] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  function UIupdateSnippet() {
    if (text !== newText && !!newText.length) {
      updateParseObject(snippet.id, ParseCollections.Snippet, {
        text: newText,
      });
    }
    setEditing(false);
  }
  function handleBlur() {
    if (editing) {
      setEditing(false);
    }
    setNewText(text);
  }
  return (
    <div className="card m-2">
      <div className="card-header p-3 has-background-dark">
        <span className="card-title has-text-white has-text-weight-bold mx-auto">
          {dateString}
        </span>
        <button
          className={
            "icon is-small ml-3 has-background-dark " +
            (editing ? "has-text-success" : "has-text-warning")
          }
          style={{
            cursor: "pointer",
            pointerEvents: editing ? "none" : "auto",
          }}
          onClick={() => !editing && setEditing(true)}
        >
          <FontAwesomeIcon icon="pen-to-square" />
        </button>
        <button
          className="delete is-small ml-3 has-background-danger"
          onClick={() =>
            deleteParseObject(snippet.id, ParseCollections.Snippet)
          }
        />
      </div>
      {editing ? (
        <textarea
          autoFocus
          rows={10}
          onBlur={handleBlur}
          className="textarea card-content"
          value={newText}
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length
            )
          }
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.ctrlKey && e.key === "Enter" && UIupdateSnippet()}
          onDoubleClick={() => UIupdateSnippet()}
        />
      ) : (
        <div
          className="card-content has-text-left"
          style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {showAll || text.length < 500 ? text : text.slice(0, 500) + "..."}
          {text.length > 500 && (
            <p
              className="has-text-right has-text-info has-text-weight-semibold"
              style={{ cursor: "pointer" }}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Switch to excerpt" : "Show all"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SnippetComponent;
