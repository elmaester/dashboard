import Parse from "parse";
import { useEffect, useState } from "react";
import createParseObject from "../functions/Parse/createParseObject";
import subscribeToQuery from "../functions/Parse/subscribeToQuery";
import ParseCollections from "../types/ParseCollections";
import { Task, TaskStatus } from "../types/Task";
import TaskComponent from "./components/TaskComponent";

const Tasks = () => {
  const [newTask, setNewTask] = useState("");
  const [activeTab, setActiveTab] = useState(TaskStatus.Active);
  const [tasks, setTasks] = useState([] as Task[]);

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
      <h1 className="title">Add new task</h1>
      <div className="is-flex">
        <input
          type="text"
          className="input mb-5"
          autoFocus
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length
            )
          }
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && UIsaveTask()}
        />
        <button className="button is-success ml-1" onClick={() => UIsaveTask()}>
          Add
        </button>
      </div>
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
      {!!tasks.length &&
        tasks
          .filter((task) => task.status === activeTab)
          .map((task) => <TaskComponent task={task} key={task.id} />)}
    </div>
  );
};

export default Tasks;
