import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Streak } from "../../types/Streak";
import arraysAreIdentical from "../functions/arraysAreIdentical";
import updateStreak from "../functions/updateStreak";

interface Props {
  streak: Streak | null;
  chooseStreak: Function;
}

const StreakDetails = ({ streak, chooseStreak }: Props) => {
  if (!streak) return null;

  const [streakName, setStreakName] = useState(streak.name);
  const [streakType, setStreakType] = useState(streak.type);
  const [streakIcon, setStreakIcon] = useState(streak.icon);
  const [streakTarget, setStreakTarget] = useState(streak.target);
  const [streakDone, setStreakDone] = useState([...streak.done]);
  const getChangeObj = () => {
    const changeObj: any = {};
    if (streakName !== streak.name) changeObj.name = streakName;
    if (streakType !== streak.type) changeObj.type = streakType;
    if (streakIcon !== streak.icon) changeObj.icon = streakIcon;
    if (streakTarget !== streak.target) changeObj.target = streakTarget;
    if (!arraysAreIdentical(streakDone, streak.done))
      changeObj.done = streakDone;
    return changeObj;
  };
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={() => chooseStreak(null)} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{streak.name}</p>
          <button
            className="delete"
            onClick={() => chooseStreak(null)}
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="has-text-centered">
            <FontAwesomeIcon
              className={`icon is-large mr-3 mb-6`}
              icon={streak.icon as IconProp}
            />
          </div>
          <span>Target: </span>
          <input
            type="number"
            className="input"
            name="target"
            id="target"
            min={1}
            value={streakTarget}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") {
                setStreakTarget(1);
              } else {
                setStreakTarget(parseInt(val));
              }
            }}
          />
        </section>
        <footer className="modal-card-foot">
          <button
            disabled={!Object.keys(getChangeObj()).length}
            className="button is-success mx-auto"
            onClick={() => updateStreak(streak.id, getChangeObj())}
          >
            Save changes
          </button>
        </footer>
      </div>
    </div>
  );
};

export default StreakDetails;
