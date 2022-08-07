import Parse from "parse";
import ParseCollections from "../../types/ParseCollections";

async function getParseObject(id: string, collection: ParseCollections) {
  const collectionReference = Parse.Object.extend(collection);
  const query = new Parse.Query(collectionReference);
  query.equalTo("objectId", id);
  const [desiredParseObject] = await query.find();
  return desiredParseObject;
}

export default getParseObject;
