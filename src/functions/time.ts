export const msInOneDay = 86400000;
export const getNextMidnight = () =>
  new Date(new Date(new Date().toDateString()).getTime() + msInOneDay);
export const getLastMidnight = () => new Date(new Date().toDateString());
