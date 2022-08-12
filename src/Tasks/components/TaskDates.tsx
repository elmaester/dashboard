import prettyMilliseconds from "pretty-ms";
import { msInOneDay } from "../../functions/time";
import formatDateAsNumbers from "../../functions/formatDateAsNumbers";
import { Task, TaskStatus } from "../../types/Task";

interface Props {
  task: Task;
}

const TaskDates = ({ task }: Props) => {
  const createdAgo = prettyMilliseconds(Date.now() - task.createdAt.getTime(), {
    compact: true,
  });
  const dueInColorClass = (() => {
    if (!task.due) return null;
    const msUntilDue = task.due - Date.now();
    if (msUntilDue < msInOneDay) {
      return " has-text-danger";
    } else if (msUntilDue < msInOneDay * 2) {
      return " has-text-warning";
    } else return null;
  })();
  const createdSpan = (
    <span>
      created: {formatDateAsNumbers(task.createdAt)} /{createdAgo}/
    </span>
  );
  const dueSpan = !!task.due ? (
    <span className={`has-text-weight-bold has-text-default${dueInColorClass}`}>
      due: {formatDateAsNumbers(task.due)} /
      {prettyMilliseconds(task.due - Date.now(), { compact: true })}/
    </span>
  ) : null;
  const snoozedTillSpan = !!task.snoozeTill ? (
    <span className="has-text-weight-medium has-text-info">
      snooze: {formatDateAsNumbers(task.snoozeTill)} /
      {prettyMilliseconds(task.snoozeTill - Date.now(), { compact: true })}/
    </span>
  ) : null;
  const completedSpan = (
    <span className="has-text-success">
      completed: {formatDateAsNumbers(task.updatedAt)} /
      {prettyMilliseconds(Date.now() - task.updatedAt.getTime(), {
        compact: true,
      })}
      /
    </span>
  );
  const spansArray = [createdSpan];
  dueSpan && spansArray.push(dueSpan);
  snoozedTillSpan && spansArray.push(snoozedTillSpan);
  task.status === TaskStatus.Completed && spansArray.push(completedSpan);
  return (
    <p className="has-text-grey-light">
      {spansArray.map((span, index) =>
        index > 0 ? (
          <>
            {", "}
            {span}
          </>
        ) : (
          span
        )
      )}
    </p>
  );
};

export default TaskDates;
