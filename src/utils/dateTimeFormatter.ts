import moment from "moment";

export function convertToMonthNameFormat(dateTime: Date | string) {
  const formatedDate = moment(dateTime)?.format("DD MMM YYYY");
  return formatedDate;
}
