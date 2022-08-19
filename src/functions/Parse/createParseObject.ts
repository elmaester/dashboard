import Parse from "parse";
import ParseCollections from "../../types/ParseCollections";
import setAttributesOnParseObject from "./setAttributesOnParseObject";

async function createParseObject(
  collection: ParseCollections,
  attributesObj: Object
) {
  const collectionReference = Parse.Object.extend(collection);
  const newlyCreatedParseObject = new collectionReference();
  setAttributesOnParseObject(newlyCreatedParseObject, attributesObj);
  newlyCreatedParseObject.set("owner", Parse.User.current()?.id);
  newlyCreatedParseObject.save();
}

export default createParseObject;
