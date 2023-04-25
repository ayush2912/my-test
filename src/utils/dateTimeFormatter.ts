import moment from "moment";

export function convertToEuropeanDateFormat(dateTime: Date) {
  const formatedDate = moment(dateTime)?.format("DD/MM/YYYY");
  return formatedDate;
}
