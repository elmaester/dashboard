import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Streak } from "../../types/Streak";
import addNewDoneTime from "../functions/addNewDoneTime";
import getTimeSinceLast from "../functions/getTimeSinceLast";

interface Props {
  streak: Streak;
}

const StreakComponent = ({ streak }: Props) => {
  const { name, icon, done, target } = streak;
  const timeSinceLast = !!done.length ? getTimeSinceLast(done) : null;
  const [hoveringOnIcon, setHoveringOnIcon] = useState(false);
  return (
    <li className="is-flex is-align-items-center py-2">
      <FontAwesomeIcon
        onClick={() => addNewDoneTime(streak, Date.now())}
        onMouseEnter={() => setHoveringOnIcon(true)}
        onMouseLeave={() => setHoveringOnIcon(false)}
        className={`icon mr-3${hoveringOnIcon ? " has-text-danger" : ""}`}
        style={{ cursor: "pointer" }}
        icon={icon as IconProp}
      />
      <span>{name}</span>
      {!!timeSinceLast && (
        <span
          className={`ml-auto${
            !!target &&
            timeSinceLast.includes("d") &&
            parseInt(timeSinceLast) > target
              ? " has-text-danger"
              : !!target &&
                target - parseInt(timeSinceLast) < 2 &&
                timeSinceLast.includes("d")
              ? " has-text-warning-dark"
              : ""
          }`}
        >
          {timeSinceLast}
          {!!target && `/${target}d`}
        </span>
      )}
    </li>
  );
};

export default StreakComponent;
