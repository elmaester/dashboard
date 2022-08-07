import { useState, useEffect } from "react";
import Parse from "parse";
import subscribeToQuery from "../functions/Parse/subscribeToQuery";
import ParseCollections from "../types/ParseCollections";
import { SortedStreaksObject, Streak } from "../types/Streak";
import StreakDetails from "./components/StreakDetailsModal";
import StreakTypeComponent from "./components/StreakTypeComponent";

const StreakBoard = () => {
  const [streaks, setStreaks] = useState({} as SortedStreaksObject);
  const [chosenStreak, setChosenStreak] = useState(null);

  function sortStreaksByType(allStreaks: Streak[]) {
    const streaks: SortedStreaksObject = {
      log: [],
      cooldown: [],
      reps: [],
      abstain: [],
    };
    allStreaks.forEach((streak: Streak) => {
      streaks[streak.type].push(streak);
    });
    return streaks;
  }

  const query = new Parse.Query(ParseCollections.Streak);
  query.ascending("createdAt");

  useEffect(() => {
    subscribeToQuery(query, setStreaks, sortStreaksByType);
  }, []);
  return (
    <div className="container mt-6">
      <StreakDetails streak={chosenStreak} chooseStreak={setChosenStreak} />
      {!!Object.keys(streaks).length && (
        <div className="columns">
          <StreakTypeComponent
            name="Track when I..."
            streakType={streaks.log}
            chooseStreak={setChosenStreak}
          />
          <StreakTypeComponent
            name="Do this regularly"
            streakType={streaks.cooldown}
            chooseStreak={setChosenStreak}
          />
          <StreakTypeComponent
            name="Practice X times"
            streakType={streaks.reps}
            chooseStreak={setChosenStreak}
          />
          <StreakTypeComponent
            name="Abstain from"
            streakType={streaks.abstain}
            chooseStreak={setChosenStreak}
          />
        </div>
      )}
    </div>
  );
};

export default StreakBoard;
