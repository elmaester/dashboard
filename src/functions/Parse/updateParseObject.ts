import ParseCollections from "../../types/ParseCollections";
import getParseObject from "./getParseObject";
import setAttributesOnParseObject from "./setAttributesOnParseObject";

async function updateParseObject(
  id: string,
  collection: ParseCollections,
  attributesObj: Object
) {
  const desiredParseObject = await getParseObject(id, collection);
  setAttributesOnParseObject(desiredParseObject, attributesObj);
  desiredParseObject.save();
}

export default updateParseObject;
