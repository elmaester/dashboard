import prettyMilliseconds from "pretty-ms";

function calculateJustIntervals(_doneArray: number[]) {
  return _doneArray.map((date, index) =>
    !!_doneArray[index + 1]
      ? _doneArray[index + 1] - _doneArray[index]
      : Date.now() - _doneArray[_doneArray.length - 1]
  );
}

export function calculateDoneIntervals(_doneArray: number[]) {
  const doneArray = _doneArray.map((date, index) => ({
    interval: !!_doneArray[index + 1]
      ? _doneArray[index + 1] - _doneArray[index]
      : Date.now() - _doneArray[_doneArray.length - 1],
    intervalText: "",
    date,
    dateText: new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "medium",
    }).format(new Date(date)),
  }));
  doneArray.forEach(
    (date) =>
      (date.intervalText = prettyMilliseconds(date.interval, { unitCount: 2 }))
  );
  const averageInterval =
    doneArray.map((item) => item.interval).reduce((a, b) => a + b, 0) /
      doneArray.length || 0;
  return doneArray.reverse();
}

export function calculateAverageInterval(doneArray: number[]) {
  const averageInterval = prettyMilliseconds(
    calculateJustIntervals(doneArray).reduce((a, b) => a + b, 0) /
      doneArray.length || 0,
    { unitCount: 2 }
  );
  return averageInterval;
}
