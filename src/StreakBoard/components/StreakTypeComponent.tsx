import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Streak } from "../../types/Streak";
import StreakComponent from "./StreakComponent";

interface Props {
  name: string;
  streakType: Streak[];
  chooseStreak: Function;
}

const StreakTypeComponent = ({ name, streakType, chooseStreak }: Props) => (
  <div className="column">
    <div className="card">
      <div className="card-header has-background-dark">
        <h2 className="card-header-title has-text-white">
          {name}
          <FontAwesomeIcon
            onClick={() => {}}
            className={`icon ml-auto`}
            style={{ cursor: "pointer" }}
            icon={"plus" as IconProp}
          />
        </h2>
      </div>
      <ul className="card-content mx-auto">
        {streakType.map((streak: Streak) => (
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
