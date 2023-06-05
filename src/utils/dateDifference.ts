import moment from "moment";

export function dateDifference(
  startDateTime: string | Date | undefined | null,
  endDateTime: string | Date | undefined | null,
) {
  const startDate = moment(startDateTime);
  const endDate = moment(endDateTime);

  const yearDiff = moment.duration(endDate.diff(startDate)).years();
  const monthDiff = moment.duration(endDate.diff(startDate)).months();
  const weekDiff = moment.duration(endDate.diff(startDate)).weeks();
  const dayDiff = moment.duration(endDate.diff(startDate)).days();

  if (yearDiff) return [yearDiff, yearDiff > 1 ? "years" : "year"];
  if (monthDiff) return [monthDiff, monthDiff > 1 ? "months" : "month"];
  if (weekDiff) return [weekDiff, weekDiff > 1 ? "weeks" : "week"];
  if (dayDiff) return [dayDiff, dayDiff > 1 ? "days" : "day"];

  return ["0", "difference"];
}
