import { useState, useEffect } from "react";
import Parse from "parse";
import subscribeToQuery from "../functions/Parse/subscribeToQuery";
import ParseCollections from "../types/ParseCollections";
import { SortedStreaksObject, Streak, StreakType } from "../types/Streak";
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
      {!!chosenStreak && (
        <StreakDetails _streak={chosenStreak} chooseStreak={setChosenStreak} />
      )}
      {!!Object.keys(streaks).length && (
        <div className="columns">
          <StreakTypeComponent
            name="Track when I..."
            streakTypeArray={streaks.log}
            streakType={StreakType.Log}
            chooseStreak={setChosenStreak}
          />
          <StreakTypeComponent
            name="Do this regularly"
            streakTypeArray={streaks.cooldown}
            streakType={StreakType.Cooldown}
            chooseStreak={setChosenStreak}
          />
          <StreakTypeComponent
            name="Practice X times"
            streakTypeArray={streaks.reps}
            streakType={StreakType.Reps}
            chooseStreak={setChosenStreak}
          />
          <StreakTypeComponent
            name="Abstain from"
            streakTypeArray={streaks.abstain}
            streakType={StreakType.Abstain}
            chooseStreak={setChosenStreak}
          />
        </div>
      )}
    </div>
  );
};

export default StreakBoard;
