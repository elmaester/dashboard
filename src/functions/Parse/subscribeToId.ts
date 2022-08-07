import Parse from "parse";
import ParseCollections from "../../types/ParseCollections";
import convertParseObjToLocalType from "./convertParseObjToLocalType";

async function subscribeToId(
  id: string,
  collection: ParseCollections,
  setReactState: Function
) {
  function refresh(data: any) {
    if (data) {
      setReactState(convertParseObjToLocalType(data[0]));
    } else setReactState(null);
  }
  const query = new Parse.Query(collection);
  query.equalTo("objectId", id);
  refresh(await query.find());
  const subscription = await query.subscribe();
  subscription.on("update", async (data) => {
    refresh(await query.find());
  });
}

export default subscribeToId;
