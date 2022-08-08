import prettyMilliseconds from "pretty-ms";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Streak, StreakType } from "../../types/Streak";
import doneTimesHaveChanged from "../functions/doneTimesHaveChanged";
import updateParseObject from "../../functions/Parse/updateParseObject";
import ParseCollections from "../../types/ParseCollections";
import subscribeToId from "../../functions/Parse/subscribeToId";
import DateTimePicker from "react-datetime-picker";

interface Props {
  _streak: Streak;
  chooseStreak: Function;
}

const StreakDetails = ({ _streak, chooseStreak }: Props) => {
  const [streak, setStreak] = useState(null as Streak | null);

  const [streakName, setStreakName] = useState(_streak.name);
  const [streakType, setStreakType] = useState(_streak.type);
  const [streakIcon, setStreakIcon] = useState(_streak.icon);
  const [streakTarget, setStreakTarget] = useState(_streak.target);
  const [streakDone, setStreakDone] = useState(_streak.done);

  const [newTime, setNewTime] = useState(new Date());

  useEffect(() => {
    subscribeToId(_streak.id, ParseCollections.Streak, setStreak);
  }, []);

  useEffect(() => {
    if (!!streak) {
      setStreakName(streak.name);
      setStreakType(streak.type);
      setStreakIcon(streak.icon);
      setStreakTarget(streak.target);
      setStreakDone(streak.done);
    }
  }, [streak]);

  if (!streak) return null;
  const getChangeObj = () => {
    const changeObj: any = {};
    if (streakName !== streak.name) changeObj.name = streakName;
    if (streakType !== streak.type) changeObj.type = streakType;
    if (streakIcon !== streak.icon) changeObj.icon = streakIcon;
    if (streakTarget !== streak.target) changeObj.target = streakTarget;
    if (doneTimesHaveChanged(streakDone, streak.done))
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
        <section className="modal-card-body" style={{ minHeight: "550px" }}>
          {/* icon */}
          {!!streakIcon?.length && (
            <div className="has-text-centered">
              <FontAwesomeIcon
                className={`icon is-large mr-3 mb-6`}
                icon={streak.icon as IconProp}
              />
            </div>
          )}
          {/* edit name */}
          <div className="">
            <label className="label" htmlFor="streakName">
              Name:
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                id="streakName"
                value={streakName}
                onChange={(e) => setStreakName(e.target.value)}
              />
            </div>
          </div>
          {/* edit icon */}
          <div className="mt-3">
            <label className="label" htmlFor="streakIcon">
              Icon:
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                id="streakIcon"
                value={streakIcon}
                onChange={(e) => setStreakIcon(e.target.value)}
              />
            </div>
          </div>
          {/* edit type */}
          <div className="mt-3">
            <label className="label" htmlFor="streakType">
              Type:
            </label>
            <div className="control">
              <div className="select">
                <select
                  id="streakType"
                  value={streakType}
                  onChange={(e) => setStreakType(e.target.value as StreakType)}
                >
                  {Object.values(StreakType).map((type) => (
                    <option key={type} value={type}>
                      {type[0].toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* edit target */}
          {(streakType === StreakType.Cooldown ||
            streakType === StreakType.Reps) && (
            <div className="mt-3">
              <label className="label" htmlFor="streakTarget">
                Target:{" "}
              </label>
              <div className="control">
                <input
                  type="number"
                  className="input"
                  id="streakTarget"
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
              </div>
            </div>
          )}
          {/* add custom done date */}
          <div className="mt-3">
            <label className="label">Add new date:</label>
            <div className="mt-1">
              <DateTimePicker
                value={newTime}
                onChange={setNewTime}
                clearIcon={null}
                maxDate={new Date()}
                format="dd MMM y h:mma"
              />
              <button
                className="button is-small is-success is-light ml-2"
                onClick={() =>
                  setStreakDone([...streakDone, newTime.getTime()].sort())
                }
              >
                Add
              </button>
            </div>
          </div>
          {/* list done times */}
          {!!streakDone?.length && (
            <section className="box mt-5">
              {streakDone
                .map((date, index) => (
                  <div key={date}>
                    {/* interval between done dates */}
                    <p
                      className="pl-2 ml-2 my-2"
                      style={{ borderLeft: "3px solid hsl(207, 61%,  53%)" }}
                    >
                      {prettyMilliseconds(
                        !!streakDone[index + 1]
                          ? streakDone[index + 1] - streakDone[index]
                          : Date.now() - streakDone[streakDone.length - 1],
                        { unitCount: 2 }
                      )}
                    </p>
                    {/* done date */}
                    <p>
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "long",
                        timeStyle: "medium",
                      }).format(new Date(date))}
                      {/* deletion button */}
                      <button
                        className="delete ml-3 mt-1 is-small"
                        onClick={() =>
                          setStreakDone(
                            streakDone.filter((_date) => _date !== date)
                          )
                        }
                      />
                    </p>
                  </div>
                ))
                .reverse()}
            </section>
          )}
        </section>
        {/* footer */}
        <footer className="modal-card-foot">
          <button
            disabled={!Object.keys(getChangeObj()).length}
            className="button is-success mx-auto"
            onClick={() =>
              updateParseObject(
                streak.id,
                ParseCollections.Streak,
                getChangeObj()
              )
            }
          >
            Save changes
          </button>
        </footer>
      </div>
    </div>
  );
};

export default StreakDetails;
