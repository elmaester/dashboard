import { useState } from "react";
import SnippetType from "../../types/Snippet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import updateOneSnippet from "../functions/updateOneSnippet";
import deleteOneSnippet from "../functions/deleteOneSnippet";

interface Props {
  snippet: SnippetType;
}

const SnippetComponent = ({ snippet }: Props) => {
  const { createdAt } = snippet;
  const dateString = `${new Date(createdAt).toLocaleDateString()} ${new Date(
    createdAt
  ).toLocaleTimeString()}`;
  const [showAll, setShowAll] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(snippet.text);

  function UIupdateSnippet() {
    updateOneSnippet(snippet.id, newText);
    setEditing(false);
  }
  function handleBlur() {
    if (editing) {
      setEditing(false);
    }
    setNewText(snippet.text);
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
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button
          className="delete is-small ml-3 has-background-danger"
          onClick={() => deleteOneSnippet(snippet.id)}
        />
      </div>
      {editing ? (
        <textarea
          autoFocus
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
        />
      ) : (
        <div
          className="card-content has-text-left"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {showAll || snippet.text.length < 500
            ? snippet.text
            : snippet.text.slice(0, 500) + "..."}
          {snippet.text.length > 500 && (
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
