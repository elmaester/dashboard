import Parse from "parse";

function ownerIsLoggedIn() {
  const currentUser = Parse.User.current();
  if (!currentUser) return false;
  if (currentUser.id !== import.meta.env.VITE_PARSE_OWNER_USER_ID) return false;
  return true;
}

export default ownerIsLoggedIn;
