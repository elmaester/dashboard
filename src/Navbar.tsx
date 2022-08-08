import { Link, useLocation, useNavigate } from "react-router-dom";
import Parse from "parse";
import ownerIsLoggedIn from "./authentication/functions/ownerIsLoggedIn";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  async function logOut() {
    await Parse.User.logOut();
    navigate("/login");
  }
  const navItems = ["pastebin", "streakboard", "tasks"];
  return ownerIsLoggedIn() ? (
    <div className="container mt-1">
      <div className="tabs is-boxed">
        <ul>
          {navItems.map((item) => (
            <li
              key={item}
              className={location.pathname.slice(1) === item ? "is-active" : ""}
            >
              <Link to={`/${item}`}>
                {item[0].toUpperCase() + item.slice(1)}
              </Link>
            </li>
          ))}
          <button
            className="button is-light is-danger ml-auto mr-1"
            onClick={logOut}
          >
            Log Out
          </button>
        </ul>
      </div>
    </div>
  ) : null;
};

export default Navbar;
