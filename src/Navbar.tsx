import { Link, useLocation, useNavigate } from "react-router-dom";
import Parse from "parse";
import userIsLoggedIn from "./authentication/functions/userIsLoggedIn";
import { useEffect, useState } from "react";
import { Task, TaskStatus } from "./types/Task";
import ParseCollections from "./types/ParseCollections";
import subscribeToQuery from "./functions/Parse/subscribeToQuery";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  async function logOut() {
    await Parse.User.logOut();
    navigate("/login");
  }
  const navItems = ["pastebin", "streakboard", "tasks"];

  const [tasks, setTasks] = useState([] as Task[]);
  const query = new Parse.Query(ParseCollections.Task);
  query.equalTo("owner", Parse.User.current()?.id);
  useEffect(() => {
    subscribeToQuery(query, (taskArr: Task[]) => setTasks(taskArr));
  }, []);

  const getTaskCount = () =>
    tasks.filter(
      (task) =>
        task.status === TaskStatus.Active &&
        (!task.snoozeTill || task.snoozeTill < Date.now())
    ).length;

  return userIsLoggedIn() ? (
    <div className="container mt-1">
      <div className="tabs is-boxed">
        <ul>
          {navItems.map((item) => (
            <li
              key={item}
              className={location.pathname.slice(1) === item ? "is-active" : ""}
            >
              <Link to={`/${item}`}>
                <>
                  {item[0].toUpperCase() + item.slice(1)}
                  {item === "tasks" && getTaskCount() > 0 && (
                    <span className="ml-1 tag is-rounded is-danger is-light has-text-weight-bold">
                      {getTaskCount()}
                    </span>
                  )}
                </>
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
