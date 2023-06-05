import moment from "moment";

export function convertToMonthNameFormat(dateTime: Date | string) {
  const formatedDate = moment(dateTime)?.format("DD MMM YYYY");
  return formatedDate;
}

export function calculateFromToday(firstDate: any, secondDate: Date | string) {
  const firstMoment = moment(firstDate);
  const secondMoment = moment(secondDate);

  if (firstMoment.isBefore(secondMoment)) {
    return "Today < inputDate";
  } else if (firstMoment.isAfter(secondMoment)) {
    return "Today > inputDate";
  } else {
    return "Today = inputDate";
  }
}

export function convertToDateTimeFormat(dateTime: Date | string) {
  const formatedDate = moment(dateTime)?.format("DD MMM YYYY - HH:mm");
  return formatedDate;
}
