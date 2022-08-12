function formatDateAsNumbers(_date: Date | number) {
  const date = typeof _date === "number" ? new Date(_date) : _date;
  const year = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
  }).format(date);
  const month = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
  }).format(date);
  const day = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
  }).format(date);
  return `${year}-${month}-${day}`;
}

export default formatDateAsNumbers;
