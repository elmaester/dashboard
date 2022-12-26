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
  showArchived: boolean;
}

const StreakTypeComponent = ({
  name,
  streakType,
  streakTypeArray,
  chooseStreak,
  hideSensitive,
  showArchived,
}: Props) => {
  let filteredStreakType = [...streakTypeArray];
  if (hideSensitive)
    filteredStreakType = filteredStreakType.filter(
      (streak) => !streak.sensitive
    );
  if (!showArchived)
    filteredStreakType = filteredStreakType.filter(
      (streak) => !streak.archived
    );
  return (
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
          {filteredStreakType.map((streak: Streak) => (
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
};
export default StreakTypeComponent;
