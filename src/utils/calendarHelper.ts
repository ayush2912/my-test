import moment from "moment";

function getFirstSundayOfYear(firstDayOfYear: any) {
  if (firstDayOfYear.day() !== 0) {
    firstDayOfYear.add(7 - firstDayOfYear.day(), "d");
  }

  return firstDayOfYear;
}

export const getBarInfo = (
  startDate: Date,
  dueDate: Date,
  completedDate: Date,
  earliestStartDate: Date,
  view: "yearly" | "monthly" | "weekly",
) => {
  const barStartDate = moment(startDate).startOf("day");
  const barCompletedDate = moment(completedDate).endOf("day");
  const barDueDate = moment(dueDate).endOf("day");

  const totalDays = (barCompletedDate || barDueDate).diff(
    barStartDate,
    "days",
    true,
  );

  const totalMonths = (barCompletedDate || barDueDate).diff(
    barStartDate,
    "months",
    true,
  );
  const totalWeeks = (barCompletedDate || barDueDate).diff(
    barStartDate,
    "weeks",
    true,
  );
  const barWidth = {
    monthly: totalDays * 40,
    yearly: totalMonths * 124,
    weekly: totalWeeks * 155,
  }[view];

  const offsetFromLeft = {
    monthly:
      barStartDate.diff(
        moment(earliestStartDate).startOf("year"),
        "days",
        true,
      ) * 40,
    yearly:
      barStartDate.diff(
        moment(earliestStartDate).startOf("year"),
        "months",
        true,
      ) * 124,
    weekly:
      barStartDate.diff(
        getFirstSundayOfYear(moment(earliestStartDate).startOf("year")),
        "weeks",
        true,
      ) * 155,
  }[view];

  return {
    offsetFromLeft,
    barWidth,
  };
};

function getAllSundays(year: number, month: number): string[] {
  const dates: string[] = [];
  const date: moment.Moment = moment([year, month, 1]);

  // Find the first Monday of the month
  while (date.day() !== 0) {
    date.add(1, "d");
  }

  // Iterate through the Mondays of the month
  while (date.month() === month) {
    dates.push(date.clone().format("D"));
    date.add(1, "w"); // Add 1 week
  }

  return dates;
}

export const getCalendarInfo = (
  earliestStartDate: Date,
  latestEndDate: Date,
) => {
  const startOfYear = moment(earliestStartDate).startOf("year");
  const endOfYear = moment(latestEndDate).endOf("year");

  const numberOfMonths = Math.round(
    endOfYear.diff(startOfYear, "months", true),
  );

  const numberOfDays = Math.round(endOfYear.diff(startOfYear, "days", true));

  const numberOfWeeks = Math.round(endOfYear.diff(startOfYear, "weeks", true));

  const numberOfYears = Math.round(endOfYear.diff(startOfYear, "years", true));

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

  const weeklyHeaderData = [...Array(Number(numberOfMonths)).keys()].map(
    (v) => {
      const newDate = moment(startOfYear).add(v, "months");
      const month = newDate.format("MMM").toUpperCase();
      const year = newDate.format("YYYY");

      const sundays = getAllSundays(newDate.year(), newDate.month());

      return {
        year,
        month,
        sundays,
      };
    },
  );

  return {
    calendarWidth: {
      monthly: numberOfDays * 40,
      weekly: numberOfWeeks * 155,
      yearly: numberOfMonths * 124,
    },
    calendarHeader: {
      monthly: monthlyHeaderData,
      weekly: weeklyHeaderData,
      yearly: yearlyHeaderData,
    },
  };
};
