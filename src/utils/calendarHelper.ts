import { toNumber } from "lodash";
import moment from "moment";

interface StatusProgressBar {
  name: string;
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
    name: string;
    startDate: string;
    completedDate: string;
    dueDate: string;
  }[],
  earliestStartDate: string,
): StatusProgressBar[] => {
  return statusLog.map((v) => {
    const startDate = moment(v.startDate).startOf("day");
    const completedDate = moment(v.completedDate).endOf("day");
    const dueDate = moment(v.dueDate).endOf("day");

    const totalDays =
      moment.duration((completedDate || dueDate).diff(startDate)).asDays() ?? 0;

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
      name: v.name,
      offsetFromLeft,
      barWidth,
    };
  });
};

export const getBarInfo = (
  startDate: Date,
  dueDate: Date,
  completedDate: Date,
  earliestStartDate: Date,
  view: "yearly" | "monthly",
) => {
  const barStartDate = moment(startDate).startOf("day");
  const barCompletedDate = moment(completedDate).endOf("day");
  const barDueDate = moment(dueDate).endOf("day");

  const totalDays = toNumber(
    moment
      .duration((barCompletedDate || barDueDate).diff(barStartDate))
      .asDays()
      .toFixed(0) ?? 0,
  );

  const totalMonths = toNumber(
    moment
      .duration((barCompletedDate || barDueDate).diff(barStartDate))
      .asMonths()
      .toFixed(0) ?? 0,
  );

  console.log("total days", totalDays);

  const offsetFromLeft = {
    monthly:
      barStartDate.diff(moment(earliestStartDate).startOf("year"), "days") * 40,
    yearly:
      (barStartDate.diff(moment(earliestStartDate).startOf("year"), "days") /
        30) *
      124,
  }[view];

  const barWidth = {
    monthly: (totalDays > 1 ? totalDays : 1) * 40,
    yearly: totalMonths * 124,
  }[view];

  return {
    offsetFromLeft,
    barWidth,
  };
};

export const getCalendarRange = (
  earliestStartDate: Date,
  latestEndDate: Date,
) => {
  const startOfYear = moment(earliestStartDate).startOf("year");
  const endOfYear = moment(latestEndDate).endOf("year");

  const numberOfMonths = Math.round(
    moment.duration(endOfYear.diff(startOfYear)).asMonths(),
  );

  const numberOfDays = Math.round(
    moment.duration(endOfYear.diff(startOfYear)).asDays(),
  );

  // const numberOfWeeks = moment
  //   .duration(endOfYear.diff(startOfYear))
  //   .asWeeks()
  //   .toFixed(0);

  const numberOfYears = Math.round(
    moment.duration(endOfYear.diff(startOfYear)).asYears(),
  );

  const yearlyHeaderData = [...Array(Number(numberOfYears)).keys()].map((v) => {
    const year = moment(startOfYear).add(v, "years").format("YYYY");

    return {
      year,
      months: [...Array(12)].map((_, i) => {
        const month = moment(startOfYear)
          .add(v, "years")
          .add(i, "months")
          .format("MMMM")
          .toUpperCase();

        return {
          month,
          isThisMonth:
            moment().format("MMMM")?.toUpperCase() === month &&
            moment().format("Y") === year,
        };
      }),
    };
  });

  const monthlyHeaderData = [...Array(Number(numberOfMonths)).keys()].map(
    (v) => {
      const newDate = moment(startOfYear).add(v, "months");
      const month = newDate.format("MMM").toUpperCase();
      const year = newDate.format("YYYY");
      const daysArr = [...Array(newDate.daysInMonth()).keys()].map(
        (v) => v + 1,
      );

      return {
        year,
        month,
        days: daysArr.map((day) => ({
          day,
          isToday:
            Number(moment().format("D")) === day &&
            moment().format("MMM")?.toUpperCase() === month &&
            moment().format("Y") === year,
        })),
      };
    },
  );

  // const weeklyHeaderData = [...Array(Number(numberOfWeeks)).keys()].map((v) => {
  //   const thisdfs = moment(startOfYear).startOf("week");
  //   const newDate = moment(startOfYear).add(v, "weeks");

  //   const year = newDate.format("YYYY");
  //   const month = newDate.format("MMM").toUpperCase();

  //   const startOfTheWeek = newDate.format("D");
  //   console.log(thisdfs.format("D"));
  //   return {
  //     year,
  //     month,
  //     days: { day: startOfTheWeek },
  //   };
  // });

  return {
    duration: {
      numberOfDays,
      numberOfMonths,
      numberOfYears,
    },
    monthlyHeaderData,
    yearlyHeaderData,
  };
};
