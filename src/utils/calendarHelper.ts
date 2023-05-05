import { toNumber } from "lodash";
import moment from "moment";

interface StatusProgressBar {
  name: string;
  completedPercentage: number;
  offsetFromLeft: {
    DAILY: number;
    MONTHLY: number;
    YEARLY: number;
  };
  barWidth: {
    DAILY: number;
    MONTHLY: number;
    YEARLY: number;
  };
}

export const getStatusProgressBar = (
  statusLog: {
    type: string;
    startDate: string;
    endDate: string;
    dueDate: string;
  }[],
  earliestStartDate: string,
): StatusProgressBar[] => {
  return statusLog.map((v) => {
    const startDate = moment(v.startDate).startOf("day");
    const endDate = moment(v.endDate).endOf("day");
    const dueDate = moment(v.dueDate).endOf("day");

    const totalDays =
      moment
        .duration((isNaN(endDate) ? dueDate : endDate).diff(startDate))
        .asDays() ?? 0;

    const completedPercentage =
      Boolean(v.endDate) || dueDate.isBefore(moment())
        ? 100
        : startDate.isAfter(moment())
        ? 0
        : (moment.duration(moment().startOf("day").diff(startDate)).asDays() /
            totalDays) *
          100;

    const offsetFromLeft = {
      DAILY: startDate.diff(moment(earliestStartDate).startOf("year"), "days"),
      MONTHLY:
        startDate.diff(moment(earliestStartDate).startOf("year"), "days") / 30,
      YEARLY:
        startDate.diff(moment(earliestStartDate).startOf("year"), "days") / 365,
    };

    const barWidth = {
      DAILY: toNumber(totalDays) > 1 ? totalDays : 1,
      MONTHLY: toNumber(totalDays) > 1 ? totalDays / 30 : 1 / 30,
      YEARLY: toNumber(totalDays) > 1 ? totalDays / 365 : 1 / 365,
    };

    return {
      name: v.type,
      completedPercentage,
      offsetFromLeft,
      barWidth,
    };
  });
};

export const getCalendarRange = (
  earliestStartDate: Date,
  latestEndDate: Date,
) => {
  const startOfYear = moment(earliestStartDate).startOf("year");
  const endOfYear = moment(latestEndDate).endOf("year").add(1, "year");

  const numberOfMonths = moment
    .duration(endOfYear.diff(startOfYear))
    .asMonths()
    .toFixed(0);

  const numberOfDays = moment
    .duration(endOfYear.diff(startOfYear))
    .asDays()
    .toFixed(0);

  const numberOfYears = moment
    .duration(endOfYear.diff(startOfYear))
    .asYears()
    .toFixed(0);

  const range = [...Array(Number(numberOfMonths)).keys()].map((v) => {
    const newDate = moment(startOfYear).add(v, "months");

    const month = newDate.format("MMMM").toUpperCase();
    const monthShortName = newDate.format("MMM").toUpperCase();

    const year = newDate.format("YYYY");
    const daysArr = [...Array(newDate.daysInMonth()).keys()].map((v) => v + 1);

    const isThisMonth =
      moment().format("MMMM")?.toUpperCase() === month &&
      moment().format("Y") === year;

    const noOfDays = daysArr.map((day) => ({
      day,
      isToday: Number(moment().format("D")) === day && isThisMonth,
    }));

    return {
      month,
      monthShortName,
      noOfDays,
      year,
      isThisMonth,
    };
  });

  return {
    duration: {
      DAILY: numberOfDays,
      MONTHLY: numberOfMonths,
      YEARLY: numberOfYears,
    },
    range,
  };
};
