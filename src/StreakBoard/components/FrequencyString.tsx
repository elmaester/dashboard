import prettyMilliseconds from "pretty-ms";
import { msInOneDay } from "../../functions/time";
import { Streak, StreakType } from "../../types/Streak";
import { calculateAverageInterval } from "../functions/calculateDoneIntervals";

interface Props {
  streak: Streak;
}

enum colors {
  default = "",
  yellow = " has-background-warning has-text-weight-bold",
  red = " has-text-danger has-background-danger-light has-text-weight-bold",
  green = " has-text-success has-background-success-light has-text-weight-bold",
}

function FrequencyString({ streak }: Props) {
  const { type, done, target } = streak;
  const timeSinceLast = !!done.length
    ? Date.now() - done[done.length - 1]
    : null;
  if (!timeSinceLast) return null;
  const daysSinceLast = timeSinceLast / msInOneDay;
  let color = colors.default;
  const averageInterval = calculateAverageInterval(done);
  const averageIntervalDays = averageInterval / msInOneDay;
  const part1 =
    type === StreakType.Reps
      ? done.length
      : prettyMilliseconds(timeSinceLast, { unitCount: 1 });
  let part2 = "";
  if (type === StreakType.Reps) {
    part2 = `/${target}`;
    if (!!target) {
      if (done.length >= target) {
        color = colors.green;
      } else if (done.length > target / 2) {
        color = colors.yellow;
      } else {
        color = colors.red;
      }
    }
  }
  if (type === StreakType.Cooldown) {
    part2 = `/${target}`;
    if (daysSinceLast >= 1 && !!target) {
      if (daysSinceLast > target) {
        color = colors.red;
      } else if (target - daysSinceLast <= 1) {
        color = colors.yellow;
      }
    }
  }
  if (type === StreakType.Log && done.length >= 5) {
    part2 = `/${Math.round(averageIntervalDays)}`;
    if (timeSinceLast - averageInterval > msInOneDay * 2) {
      color = colors.red;
    } else if (averageInterval - timeSinceLast < msInOneDay) {
      color = colors.yellow;
    }
  }
  if (type === StreakType.Abstain && done.length > 1) {
    part2 = `/${Math.round(averageIntervalDays)}`;
    if (timeSinceLast > msInOneDay * 30) {
      color = colors.green;
    } else if (timeSinceLast / averageInterval < 0.8) {
      color = colors.red;
    } else if (timeSinceLast / averageInterval <= 2) {
      color = colors.yellow;
    } else {
      color = colors.green;
    }
  }
  return <span className={"ml-auto" + color}>{part1 + part2}</span>;
}

export default FrequencyString;
