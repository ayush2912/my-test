import moment from "moment";

export function getDateDifference(
  startDateTime: string | Date | undefined | null,
  endDateTime: string | Date | undefined | null,
) {
  const startDate = moment(startDateTime);
  const endDate = moment(endDateTime);

  const monthDiff = moment.duration(endDate.diff(startDate)).months();
  const dayDiff = moment.duration(endDate.diff(startDate)).days();

  if (monthDiff) return [monthDiff, monthDiff > 1 ? "MONTHS" : "MONTH"];
  return [dayDiff, dayDiff > 1 ? "DAYS" : "DAY"];
}
