import convertParseObjToLocalType from "./convertParseObjToLocalType";

async function subscribeToQuery(
  query: Parse.Query<Parse.Object<Parse.Attributes>>,
  setReactState: Function,
  processFunc?: Function
) {
  function refresh(data: any) {
    if (data) {
      const allCollectionItems = Object.values(data).map((obj: any) =>
        convertParseObjToLocalType(obj)
      );
      setReactState(
        processFunc ? processFunc(allCollectionItems) : allCollectionItems
      );
    } else setReactState([]);
  }
  refresh(await query.find());
  const subscription = await query.subscribe();
  subscription.on("create", async (data) => {
    refresh(await query.find());
  });
  subscription.on("update", async (data) => {
    refresh(await query.find());
  });
  subscription.on("delete", async (data) => {
    refresh(await query.find());
  });
}

export default subscribeToQuery;
