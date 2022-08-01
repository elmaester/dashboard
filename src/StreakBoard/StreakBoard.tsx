import { useState, useEffect } from "react";
import { SortedStreaksObject, Streak } from "../types/Streak";
import StreakTypeComponent from "./components/StreakTypeComponent";
import fetchAllStreaks from "./functions/fetchAllStreaks";

const StreakBoard = () => {
  const [streaks, setStreaks] = useState({} as SortedStreaksObject);
  useEffect(() => {
    fetchAllStreaks(setStreaks);
  }, []);
  return (
    <div className="container mt-6">
      {Object.keys(streaks).length && (
        <div className="columns">
          <StreakTypeComponent name="Track when I..." streakType={streaks.log} />
          <StreakTypeComponent name="Do this regularly" streakType={streaks.cooldown} />
          <StreakTypeComponent name="Practice X times" streakType={streaks.reps} />
          <StreakTypeComponent name="Abstain from" streakType={streaks.abstain} />
        </div>
      )}
    </div>
  );
};

export default StreakBoard;
