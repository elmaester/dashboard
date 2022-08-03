import Parse from "parse";

async function findStreakById(id: string) {
  const Streak = Parse.Object.extend("Streak");
  const query = new Parse.Query(Streak);
  query.equalTo("objectId", id);
  const [streak] = await query.find();
  return streak;
}

export default findStreakById;
