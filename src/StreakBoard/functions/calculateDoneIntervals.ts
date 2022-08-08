import prettyMilliseconds from "pretty-ms";

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
  const allIntervals = doneArray.map((date, index) =>
    !!doneArray[index + 1]
      ? doneArray[index + 1] - doneArray[index]
      : Date.now() - doneArray[doneArray.length - 1]
  );
  const averageInterval =
    allIntervals.reduce((a, b) => a + b, 0) / doneArray.length || 0;
  return averageInterval;
}
