import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import deleteParseObject from "../../functions/Parse/deleteParseObject";
import updateParseObject from "../../functions/Parse/updateParseObject";
import ParseCollections from "../../types/ParseCollections";
import { Task, TaskStatus } from "../../types/Task";

interface Props {
  task: Task;
}

const TaskComponent = ({ task }: Props) => {
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
    <div className="box is-flex">
      <span className="has-text-weight-bold">{task.description}</span>
      <span className="ml-1 has-text-grey-light is-hidden-mobile">
        (created: {task.createdAt.toDateString()})
      </span>
      <div className="ml-auto">
        <FontAwesomeIcon
          onMouseEnter={() => setHoveringOnCheck(true)}
          onMouseLeave={() => setHoveringOnCheck(false)}
          icon="check"
          className={getCheckClassname()}
          style={{ cursor: "pointer" }}
          onClick={() =>
            updateParseObject(task.id, ParseCollections.Task, {
              status:
                task.status === TaskStatus.Active
                  ? TaskStatus.Completed
                  : TaskStatus.Active,
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
