import { useEffect, useState } from "react";
import updateParseObject from "../../functions/Parse/updateParseObject";
import ParseCollections from "../../types/ParseCollections";
import subscribeToId from "../../functions/Parse/subscribeToId";
import { Task } from "../../types/Task";
import DateTimePicker from "react-datetime-picker";

interface Props {
  _task: Task;
  chooseTask: Function;
}

const TaskDetails = ({ _task, chooseTask }: Props) => {
  const [task, setTask] = useState(null as Task | null);

  const [taskDescription, setTaskDescription] = useState(_task.description);
  const [taskDue, setTaskDue] = useState(_task.due);
  const [taskSnoozeTill, setTaskSnoozeTill] = useState(_task.snoozeTill);

  useEffect(() => {
    subscribeToId(_task.id, ParseCollections.Task, setTask);
  }, []);

  useEffect(() => {
    if (!!task) {
      setTaskDescription(task.description);
      setTaskDue(task.due);
      setTaskSnoozeTill(task.snoozeTill);
    }
  }, [task]);

  if (!task) return null;
  const getChangeObj = () => {
    const changeObj: any = {};
    if (taskDescription !== task.description)
      changeObj.description = taskDescription;
    if (taskDue !== task.due) changeObj.due = taskDue;
    if (taskSnoozeTill !== task.snoozeTill)
      changeObj.snoozeTill = taskSnoozeTill;
    return changeObj;
  };
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={() => chooseTask(null)} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{task.description}</p>
          <button
            className="delete"
            onClick={() => chooseTask(null)}
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body" style={{ minHeight: "550px" }}>
          {/* edit description */}
          <div className="">
            <label className="label" htmlFor="taskDescription">
              Description:
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                id="taskDescription"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>
          </div>
          {/* edit due time */}
          <div className="mt-3">
            <label className="label">Due:</label>
            <DateTimePicker
              value={taskDue ? new Date(taskDue) : new Date()}
              onChange={(newValue) => setTaskDue(newValue.getTime())}
              clearIcon={null}
              maxDate={new Date()}
              format="dd MMM y h:mma"
            />
          </div>
          {/* edit snooze till */}
          <div className="mt-3">
            <label className="label">Snooze till: </label>
            <DateTimePicker
              value={taskSnoozeTill ? new Date(taskSnoozeTill) : new Date()}
              onChange={(newValue) => setTaskSnoozeTill(newValue.getTime())}
              clearIcon={null}
              maxDate={new Date()}
              format="dd MMM y h:mma"
            />
          </div>
        </section>
        {/* footer */}
        <footer className="modal-card-foot">
          <button
            disabled={!Object.keys(getChangeObj()).length}
            className="button is-success mx-auto"
            onClick={() =>
              updateParseObject(
                task.id,
                ParseCollections.Streak,
                getChangeObj()
              )
            }
          >
            Save changes
          </button>
        </footer>
      </div>
    </div>
  );
};

export default TaskDetails;
