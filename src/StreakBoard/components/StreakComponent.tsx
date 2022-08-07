import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import updateParseObject from "../../functions/Parse/updateParseObject";
import ParseCollections from "../../types/ParseCollections";
import { Streak, StreakType } from "../../types/Streak";
import getTimeSinceLast from "../functions/getTimeSinceLast";

interface Props {
  streak: Streak;
  chooseStreak: Function;
}

const StreakComponent = ({ streak, chooseStreak }: Props) => {
  const { name, icon, done, target } = streak;
  const timeSinceLast = !!done.length ? getTimeSinceLast(done) : null;
  const [hoveringOnIcon, setHoveringOnIcon] = useState(false);
  return (
    <li className="is-flex is-align-items-center py-2">
      <FontAwesomeIcon
        onClick={() =>
          updateParseObject(streak.id, ParseCollections.Streak, {
            done: [...streak.done, Date.now()].sort(),
          })
        }
        onMouseEnter={() => setHoveringOnIcon(true)}
        onMouseLeave={() => setHoveringOnIcon(false)}
        className={`icon mr-3${hoveringOnIcon ? " has-text-danger" : ""}`}
        style={{ cursor: "pointer" }}
        icon={icon as IconProp}
      />
      <span onClick={() => chooseStreak(streak)} style={{ cursor: "pointer" }}>
        {name}
      </span>
      {!!timeSinceLast && (
        <span
          className={`ml-auto${
            !!target &&
            timeSinceLast.includes("d") &&
            parseInt(timeSinceLast) > target
              ? " has-text-danger has-background-light has-text-weight-bold"
              : !!target &&
                target - parseInt(timeSinceLast) < 2 &&
                timeSinceLast.includes("d")
              ? " has-background-warning has-text-weight-bold"
              : ""
          }`}
        >
          {!!target &&
            streak.type === StreakType.Cooldown &&
            `${timeSinceLast}/${target}`}
          {!!target &&
            streak.type === StreakType.Reps &&
            `${done.length}/${target}`}
          {!target && timeSinceLast}
        </span>
      )}
    </li>
  );
};

export default StreakComponent;
