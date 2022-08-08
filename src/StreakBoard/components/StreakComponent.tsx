import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import updateParseObject from "../../functions/Parse/updateParseObject";
import ParseCollections from "../../types/ParseCollections";
import { Streak } from "../../types/Streak";
import FrequencyString from "./FrequencyString";

interface Props {
  streak: Streak;
  chooseStreak: Function;
}

const StreakComponent = ({ streak, chooseStreak }: Props) => {
  const { name, icon, done, target } = streak;
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
      <FrequencyString streak={streak} />
    </li>
  );
};

export default StreakComponent;
