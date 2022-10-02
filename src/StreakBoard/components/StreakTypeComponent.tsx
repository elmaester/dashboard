import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import createParseObject from "../../functions/Parse/createParseObject";
import ParseCollections from "../../types/ParseCollections";
import { Streak, StreakType } from "../../types/Streak";
import StreakComponent from "./StreakComponent";

interface Props {
  name: string;
  streakTypeArray: Streak[];
  streakType: StreakType;
  chooseStreak: Function;
  hideSensitive: boolean;
}

const StreakTypeComponent = ({
  name,
  streakType,
  streakTypeArray,
  chooseStreak,
  hideSensitive,
}: Props) => (
  <div className="column">
    <div className="card">
      <div className="card-header has-background-dark">
        <h2 className="card-header-title has-text-white">
          {name}
          <FontAwesomeIcon
            onClick={() =>
              createParseObject(ParseCollections.Streak, {
                type: streakType,
                name: "New Streak",
                icon: "bullseye",
              })
            }
            className={`icon ml-auto`}
            style={{ cursor: "pointer" }}
            icon={"plus" as IconProp}
          />
        </h2>
      </div>
      <ul className="card-content mx-auto">
        {(hideSensitive
          ? streakTypeArray.filter((streak) => !streak.sensitive)
          : streakTypeArray
        ).map((streak: Streak) => (
          <StreakComponent
            key={streak.id}
            streak={streak}
            chooseStreak={chooseStreak}
          />
        ))}
      </ul>
    </div>
  </div>
);
export default StreakTypeComponent;
