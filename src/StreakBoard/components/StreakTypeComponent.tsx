import { Streak } from "../../types/Streak";
import StreakComponent from "./StreakComponent";

interface Props {
  name: string;
  streakType: Streak[];
}

const StreakTypeComponent = ({ name, streakType }: Props) => (
  <div className="column">
    <div className="card">
      <div className="card-header has-background-dark">
        <h2 className="card-header-title has-text-white">
          {name[0].toUpperCase() + name.slice(1)}
        </h2>
      </div>
      <ul className="card-content mx-auto" style={{maxWidth: "fit-content"}}>
        {streakType.map((streak: Streak) => (
          <StreakComponent key={streak.id} streak={streak} />
        ))}
      </ul>
    </div>
  </div>
);
export default StreakTypeComponent;
