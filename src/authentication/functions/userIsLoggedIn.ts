import Parse from "parse";

function userIsLoggedIn() {
  const currentUser = Parse.User.current();
  if (!currentUser) return false;
  return true;
}

export default userIsLoggedIn;
