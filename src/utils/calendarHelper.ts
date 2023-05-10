import moment from "moment";

import { ProjectEngagement } from "@/components/GanttChart/GanttChart.types";

function getFirstSundayOfYear(firstDayOfYear: any) {
  if (firstDayOfYear.day() !== 0) {
    firstDayOfYear.add(7 - firstDayOfYear.day(), "d");
  }

  return firstDayOfYear;
}

export const getBarInfo = (
  startDate: Date,
  dueDate: Date,
  completedDate: Date | null,
  earliestStartDate: Date,
) => {
  const barStartDate = moment(startDate).startOf("day");
  const barEndDate = moment(completedDate || dueDate).endOf("day");

  return {
    offsetFromLeft: {
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
    },
    width: {
      monthly: barEndDate.diff(barStartDate, "days", true) * 40,
      yearly: barEndDate.diff(barStartDate, "months", true) * 124,
      weekly: barEndDate.diff(barStartDate, "weeks", true) * 155,
    },
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

export const getCalendarHeaderAndWidth = (
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

export const memoizedCalendarData = (
  projectEngagementData: ProjectEngagement[],
) => {
  const allEngagements = projectEngagementData.map((v) => v.engagements).flat();

  const allTasks = allEngagements.map((v) => v.tasks).flat();

  const allStartDate = [
    ...allEngagements.map((v) => moment(v.startDate)),
    ...allTasks.map((v) => moment(v.startDate)),
  ];
  const allEndDate = [
    ...allEngagements.map((v) =>
      moment(v.completedDate ? v.completedDate : v.dueDate ?? v.startDate),
    ),
    ...allTasks.map((v) =>
      moment(v.completedDate ? v.completedDate : v.dueDate ?? v.startDate),
    ),
  ];
  const earliestStartDate = moment.min(allStartDate).toDate();
  const latestEndDate = moment.max(allEndDate).toDate();
  const { calendarHeader, calendarWidth } = getCalendarHeaderAndWidth(
    earliestStartDate,
    latestEndDate,
  );
  return {
    earliestStartDate,
    latestEndDate,
    header: calendarHeader,
    width: calendarWidth,
  };
};
