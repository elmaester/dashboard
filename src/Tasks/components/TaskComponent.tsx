import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import deleteParseObject from "../../functions/Parse/deleteParseObject";
import updateParseObject from "../../functions/Parse/updateParseObject";
import ParseCollections from "../../types/ParseCollections";
import { Task, TaskStatus } from "../../types/Task";
import TaskDates from "./TaskDates";

interface Props {
  task: Task;
  chooseTask: Function;
}

const TaskComponent = ({ task, chooseTask }: Props) => {
  const [hoveringOnPin, setHoveringOnPin] = useState(false);
  const [hoveringOnEye, setHoveringOnEye] = useState(false);
  const [hoveringOnCheck, setHoveringOnCheck] = useState(false);
  const [hoveringOnDelete, setHoveringOnDelete] = useState(false);
  const getPinClassname = () => {
    let className = "mr-2 icon";
    if (hoveringOnPin) {
      className += " has-text-info";
    } else if (task.pinned) {
      className += " has-text-info-dark";
    } else {
      className += " has-text-grey-lighter";
    }
    return className;
  };
  const getEyeClassname = () => {
    let className = "mr-2 icon";
    if (hoveringOnEye) {
      className += " has-text-warning";
    } else if (task.status === TaskStatus.Shelved) {
      className += " has-text-warning-dark";
    } else {
      className += " has-text-grey-lighter";
    }
    return className;
  };
  const getCheckClassname = () => {
    let className = "mr-2 icon";
    if (hoveringOnCheck) {
      className += " has-text-success";
    } else if (task.status === TaskStatus.Completed) {
      className += " has-text-success-dark";
    } else {
      className += " has-text-grey-lighter";
    }
    return className;
  };
  return (
    <div className="box is-flex is-align-items-center">
      <div className="mr-3 has-text-left">
        <p
          onClick={() =>
            task.status !== TaskStatus.Completed && chooseTask(task)
          }
          className="has-text-weight-bold"
          style={{
            cursor:
              task.status !== TaskStatus.Completed ? "pointer" : "default",
            textDecoration:
              task.status === TaskStatus.Completed ? "line-through" : "none",
          }}
        >
          {task.description}
        </p>
        <TaskDates task={task} />
      </div>
      <div className="ml-auto is-flex is-flex-wrap-nowrap">
        <FontAwesomeIcon
          onMouseEnter={() => setHoveringOnCheck(true)}
          onMouseLeave={() => setHoveringOnCheck(false)}
          icon="check"
          className={getCheckClassname()}
          style={{ cursor: "pointer" }}
          onClick={() =>
            updateParseObject(task.id, ParseCollections.Task, {
              status:
                task.status === TaskStatus.Completed
                  ? TaskStatus.Active
                  : TaskStatus.Completed,
              due: null,
              snoozeTill: null,
              completionTime:
                task.status === TaskStatus.Completed ? null : Date.now(),
            })
          }
        />
        {task.status !== TaskStatus.Completed && (
          <FontAwesomeIcon
            onMouseEnter={() => setHoveringOnEye(true)}
            onMouseLeave={() => setHoveringOnEye(false)}
            icon="eye-slash"
            className={getEyeClassname()}
            style={{ cursor: "pointer" }}
            onClick={() =>
              updateParseObject(task.id, ParseCollections.Task, {
                status:
                  task.status === TaskStatus.Active
                    ? TaskStatus.Shelved
                    : TaskStatus.Active,
                due: null,
                snoozeTill: null,
              })
            }
          />
        )}
        <FontAwesomeIcon
          onMouseEnter={() => setHoveringOnPin(true)}
          onMouseLeave={() => setHoveringOnPin(false)}
          icon="thumbtack"
          className={getPinClassname()}
          style={{ cursor: "pointer" }}
          onClick={() =>
            updateParseObject(task.id, ParseCollections.Task, {
              pinned: !task.pinned,
            })
          }
        />
        <button
          className={`delete${
            hoveringOnDelete ? " has-background-danger" : ""
          }`}
          onClick={() => deleteParseObject(task.id, ParseCollections.Task)}
          onMouseEnter={() => setHoveringOnDelete(true)}
          onMouseLeave={() => setHoveringOnDelete(false)}
        />
      </div>
    </div>
  );
};

export default TaskComponent;
