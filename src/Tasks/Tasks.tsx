import Parse from "parse";
import { useEffect, useState } from "react";
import createParseObject from "../functions/Parse/createParseObject";
import subscribeToQuery from "../functions/Parse/subscribeToQuery";
import ParseCollections from "../types/ParseCollections";
import { Task, TaskStatus } from "../types/Task";
import TaskComponent from "./components/TaskComponent";
import TaskDetails from "./components/TaskDetailsModal";

const Tasks = () => {
  const [newTask, setNewTask] = useState("");
  const [activeTab, setActiveTab] = useState(TaskStatus.Active);
  const [tasks, setTasks] = useState([] as Task[]);
  const [chosenTask, setChosenTask] = useState(null);
  const [showSnoozed, setShowSnoozed] = useState(false);

  const query = new Parse.Query(ParseCollections.Task);
  query.descending(["pinned", "createdAt"]);

  useEffect(() => {
    subscribeToQuery(query, setTasks);
  }, []);

  async function UIsaveTask() {
    if (!!newTask.length) {
      await createParseObject(ParseCollections.Task, { description: newTask });
      await setNewTask("");
      setActiveTab(TaskStatus.Active);
    }
  }
  return (
    <div
      className="container mt-6 has-text-centered"
      style={{ maxWidth: "800px" }}
    >
      {!!chosenTask && (
        <TaskDetails _task={chosenTask} chooseTask={setChosenTask} />
      )}
      <h1 className="title">Add new task</h1>
      <input
        type="text"
        className="input mb-5"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && UIsaveTask()}
      />
      <div className="tabs is-centered is-toggle">
        <ul>
          {Object.values(TaskStatus).map((item) => (
            <li
              key={item}
              className={activeTab === item ? "is-active" : ""}
              onClick={() => setActiveTab(item)}
            >
              <a>{item[0].toUpperCase() + item.slice(1)}</a>
            </li>
          ))}
        </ul>
      </div>
      {!!tasks.length && (
        <div>
          {activeTab === TaskStatus.Active &&
            !!tasks.filter((task) => !!task.snoozeTill).length && (
              <div className="is-flex my-6 ml-5">
                <input
                  type="checkbox"
                  name="showSnoozed"
                  id="showSnoozed"
                  className="checkbox mr-2"
                  style={{ outline: "none" }}
                  checked={showSnoozed}
                  onChange={() => setShowSnoozed(!showSnoozed)}
                />
                <label
                  className="has-color-grey"
                  style={{ cursor: "pointer" }}
                  htmlFor="showSnoozed"
                >
                  Show snoozed
                </label>
              </div>
            )}
          {tasks
            .filter((task) => task.status === activeTab)
            .filter((task) =>
              showSnoozed ? true : !!task.snoozeTill ? false : true
            )
            .map((task) => (
              <TaskComponent
                task={task}
                chooseTask={setChosenTask}
                key={task.id}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
