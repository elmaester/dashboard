import { useState } from "react";
import Parse from "parse";
import { useNavigate } from "react-router-dom";
import userIsLoggedIn from "./functions/userIsLoggedIn";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const doLogin = async () => {
    try {
      await Parse.User.logIn(userName, password);
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setUserName("");
      setPassword("");
      if (userIsLoggedIn()) navigate("/pastebin");
    }
  };
  return (
    <div className="container mt-6 px-4" style={{ maxWidth: "500px" }}>
      <label htmlFor="userName" className="label">
        Username
      </label>
      <input
        id="userName"
        autoFocus
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="input"
      />
      <label htmlFor="password" className="label mt-2">
        Password
      </label>
      <input
        id="password"
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
