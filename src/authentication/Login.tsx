import { useState } from "react";
import Parse from "parse";
import { useNavigate } from "react-router-dom";
import ownerIsLoggedIn from "./functions/ownerIsLoggedIn";

function Login() {
  const userName = import.meta.env.VITE_PARSE_OWNER_USER_NAME;
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const doLogin = async () => {
    try {
      await Parse.User.logIn(userName, password);
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setPassword("");
      if (ownerIsLoggedIn()) navigate("/pastebin");
    }
  };
  return (
    <div className="container mt-6">
      <input
        autoFocus
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && doLogin()}
        className="input"
      />
      {!!message.length && <p className="has-text-danger">{message}</p>}
    </div>
  );
}

export default Login;
