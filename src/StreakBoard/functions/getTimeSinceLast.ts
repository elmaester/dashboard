import prettyMilliseconds from "pretty-ms";

function getTimeSinceLast(done: number[]) {
  return prettyMilliseconds(
    Date.now() - new Date(done[done.length - 1]).getTime(),
    {
      compact: true,
    }
  );
}

export default getTimeSinceLast;
