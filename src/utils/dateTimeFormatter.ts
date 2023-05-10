import moment from "moment";

export function convertToEuropeanDateFormat(dateTime: Date | string) {
  const formatedDate = moment(dateTime)?.format("DD/MM/YYYY");
  return formatedDate;
}

export function convertToMonthNameFormat(dateTime: Date | string) {
  const formatedDate = moment(dateTime)?.format("DD/MMM/YYYY");
  return formatedDate;
}
