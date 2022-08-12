import { useEffect, useState } from "react";
import updateParseObject from "../../functions/Parse/updateParseObject";
import ParseCollections from "../../types/ParseCollections";
import subscribeToId from "../../functions/Parse/subscribeToId";
import { Task, TaskStatus } from "../../types/Task";
import DatePicker from "react-date-picker";
import { getLastMidnight, getNextMidnight } from "../../functions/time";

interface Props {
  _task: Task;
  chooseTask: Function;
}

const TaskDetails = ({ _task, chooseTask }: Props) => {
  const [task, setTask] = useState(null as Task | null);

  const [taskDescription, setTaskDescription] = useState(_task.description);
  const [taskDue, setTaskDue] = useState(
    _task.due as number | null | undefined
  );
  const [taskSnoozeTill, setTaskSnoozeTill] = useState(
    _task.snoozeTill as number | null | undefined
  );

  const [showDuePicker, setShowDuePicker] = useState(!!_task.due);
  const [showSnoozePicker, setShowSnoozePicker] = useState(!!_task.snoozeTill);

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
        <section className="modal-card-body" style={{ minHeight: "350px" }}>
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
          {_task.status === TaskStatus.Active && (
            <div>
              {/* edit due time */}
              <div className="mt-3">
                <div
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                >
                  <div>
                    <label className="label">Due:</label>
                    {showDuePicker || !!taskDue ? (
                      <div className="is-flex is-justify-content-center">
                        <DatePicker
                          value={
                            taskDue ? new Date(taskDue) : getLastMidnight()
                          }
                          onChange={(newValue: Date) =>
                            setTaskDue(newValue.getTime())
                          }
                          clearIcon={null}
                          minDate={getLastMidnight()}
                          format="dd MMM y"
                        />
                        {!!taskDue && (
                          <button
                            className="button is-danger ml-2"
                            onClick={() => {
                              setTaskDue(null);
                              setShowDuePicker(false);
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ) : (
                      <button
                        className="button is-info"
                        onClick={() => {
                          setShowDuePicker(true);
                          setTaskDue(getLastMidnight().getTime());
                        }}
                      >
                        Add
                      </button>
                    )}
                  </div>
                  {/* edit snooze till */}
                  <div>
                    <label className="label">Snooze till:</label>
                    {showSnoozePicker || !!taskSnoozeTill ? (
                      <div className="is-flex is-justify-content-center">
                        <DatePicker
                          value={
                            taskSnoozeTill
                              ? new Date(taskSnoozeTill)
                              : new Date(new Date().toDateString())
                          }
                          onChange={(newValue: Date) =>
                            setTaskSnoozeTill(newValue.getTime())
                          }
                          clearIcon={null}
                          minDate={getNextMidnight()}
                          format="dd MMM y"
                        />
                        {!!taskSnoozeTill && (
                          <button
                            className="button is-danger ml-2"
                            onClick={() => {
                              setTaskSnoozeTill(null);
                              setShowSnoozePicker(false);
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ) : (
                      <button
                        className="button is-info"
                        onClick={() => {
                          setShowSnoozePicker(true);
                          setTaskSnoozeTill(getNextMidnight().getTime());
                        }}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
        {/* footer */}
        <footer className="modal-card-foot">
          <button
            disabled={!Object.keys(getChangeObj()).length}
            className="button is-success mx-auto"
            onClick={() => {
              updateParseObject(task.id, ParseCollections.Task, getChangeObj());
              setShowDuePicker(false);
            }}
          >
            Save changes
          </button>
        </footer>
      </div>
    </div>
  );
};

export default TaskDetails;
