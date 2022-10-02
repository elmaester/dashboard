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
  const [hideSensitive, setHideSensitive] = useState(true);

  useEffect(() => {
    const localStorageHideSensitive = localStorage.getItem("hideSensitive");
    if (localStorageHideSensitive) {
      setHideSensitive(JSON.parse(localStorageHideSensitive));
    }
  }, []);

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
  query.equalTo("owner", Parse.User.current()?.id);
  query.ascending("createdAt");

  useEffect(() => {
    subscribeToQuery(query, setStreaks, sortStreaksByType);
  }, []);
  return (
    <div className="container">
      {!!chosenStreak && (
        <StreakDetails _streak={chosenStreak} chooseStreak={setChosenStreak} />
      )}
      <div className="block mt-5">
        <label htmlFor="hide-sensitive" className="checkbox">
          <input
            type="checkbox"
            name="hide-sensitive"
            id="hide-sensitive"
            checked={hideSensitive}
            onChange={() => {
              localStorage.setItem(
                "hideSensitive",
                JSON.stringify(!hideSensitive)
              );
              setHideSensitive(!hideSensitive);
            }}
            className="mr-2"
          />
          Hide sensitive
        </label>
      </div>
      {!!Object.keys(streaks).length && (
        <div className="columns">
          <StreakTypeComponent
            name="Track when I..."
            streakTypeArray={streaks.log}
            streakType={StreakType.Log}
            chooseStreak={setChosenStreak}
            hideSensitive={hideSensitive}
          />
          <StreakTypeComponent
            name="Do this regularly"
            streakTypeArray={streaks.cooldown}
            streakType={StreakType.Cooldown}
            chooseStreak={setChosenStreak}
            hideSensitive={hideSensitive}
          />
          <StreakTypeComponent
            name="Practice X times"
            streakTypeArray={streaks.reps}
            streakType={StreakType.Reps}
            chooseStreak={setChosenStreak}
            hideSensitive={hideSensitive}
          />
          <StreakTypeComponent
            name="Abstain from"
            streakTypeArray={streaks.abstain}
            streakType={StreakType.Abstain}
            chooseStreak={setChosenStreak}
            hideSensitive={hideSensitive}
          />
        </div>
      )}
    </div>
  );
};

export default StreakBoard;
