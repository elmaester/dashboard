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
      return " has-background-warning has-text-dark";
    } else return null;
  })();
  const createdSpan = (
    <span key={`${task.createdAt}${task.description}`}>
      created: {formatDateAsNumbers(task.createdAt)} /{createdAgo}/
    </span>
  );
  const dueSpan = !!task.due ? (
    <span
      className={`has-text-weight-bold has-text-default${dueInColorClass}`}
      key={`${task.due}${task.description}`}
    >
      due: {formatDateAsNumbers(task.due)} /
      {prettyMilliseconds(task.due - Date.now(), { compact: true })}/
    </span>
  ) : null;
  const snoozedTillSpan = !!task.snoozeTill ? (
    <span
      className="has-text-weight-medium has-text-info"
      key={`${task.snoozeTill}${task.description}`}
    >
      snooze: {formatDateAsNumbers(task.snoozeTill)} /
      {prettyMilliseconds(task.snoozeTill - Date.now(), { compact: true })}/
    </span>
  ) : null;
  const completedSpan = task.completionTime ? (
    <span
      className="has-text-success"
      key={`${task.completionTime}${task.description}`}
    >
      completed: {formatDateAsNumbers(task.completionTime)} /
      {prettyMilliseconds(Date.now() - task.completionTime, {
        compact: true,
      })}
      /
    </span>
  ) : null;
  const spansArray = [createdSpan];
  dueSpan && spansArray.push(dueSpan);
  snoozedTillSpan && spansArray.push(snoozedTillSpan);
  completedSpan && spansArray.push(completedSpan);
  return (
    <p className="has-text-grey-light">
      {spansArray.map((span, index) =>
        index > 0 ? (
          <span key={index}>
            {", "}
            {span}
          </span>
        ) : (
          span
        )
      )}
    </p>
  );
};

export default TaskDates;
