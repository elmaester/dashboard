import ParseCollections from "../../types/ParseCollections";
import getParseObject from "./getParseObject";

async function deleteParseObject(id: string, collection: ParseCollections) {
  const desiredParseObject = await getParseObject(id, collection);
  await desiredParseObject.destroy();
}

export default deleteParseObject;
