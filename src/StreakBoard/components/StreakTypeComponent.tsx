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
          {name[0].toUpperCase() + name.slice(1)}
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
