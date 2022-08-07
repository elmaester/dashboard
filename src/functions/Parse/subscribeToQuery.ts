async function subscribeToQuery(
  query: Parse.Query<Parse.Object<Parse.Attributes>>,
  refresh: Function
) {
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
