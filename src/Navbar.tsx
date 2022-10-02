import { Link, useLocation, useNavigate } from "react-router-dom";
import Parse from "parse";
import userIsLoggedIn from "./authentication/functions/userIsLoggedIn";
import { useEffect, useState } from "react";
import { Task, TaskStatus } from "./types/Task";
import ParseCollections from "./types/ParseCollections";
import subscribeToQuery from "./functions/Parse/subscribeToQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  async function logOut() {
    await Parse.User.logOut();
    navigate("/login");
  }
  const navItems = [
    { name: "pastebin", icon: "quote-left" },
    { name: "streakboard", icon: "table-columns" },
    { name: "tasks", icon: "list-check" },
  ];

  const [tasks, setTasks] = useState([] as Task[]);
  const query = new Parse.Query(ParseCollections.Task);
  query.equalTo("owner", Parse.User.current()?.id);
  useEffect(() => {
    subscribeToQuery(query, (taskArr: Task[]) => setTasks(taskArr));
  }, [Parse.User.current()?.id]);

  const getTaskCount = () =>
    tasks.filter(
      (task) =>
        task.status === TaskStatus.Active &&
        (!task.snoozeTill || task.snoozeTill < Date.now())
    ).length;

  return userIsLoggedIn() ? (
    <div className="container mt-1 px-2">
      <div className="tabs is-boxed">
        <ul>
          {navItems.map((item) => (
            <li
              key={item.name}
              className={
                location.pathname.slice(1) === item.name ? "is-active" : ""
              }
            >
              <Link to={`/${item.name}`}>
                <>
                  <FontAwesomeIcon icon={item.icon as IconProp} />
                  <span className="ml-2 is-hidden-mobile">
                    {item.name[0].toUpperCase() + item.name.slice(1)}
                  </span>
                  {item.name === "tasks" && getTaskCount() > 0 && (
                    <span className="ml-1 tag is-rounded is-danger is-light has-text-weight-bold">
                      {getTaskCount()}
                    </span>
                  )}
                </>
              </Link>
            </li>
          ))}
          <button
            className="button is-light is-danger ml-auto"
            onClick={logOut}
          >
            <FontAwesomeIcon icon="right-from-bracket" />
            <span className="ml-2 is-hidden-mobile">Log Out</span>
          </button>
        </ul>
      </div>
    </div>
  ) : null;
};

export default Navbar;
