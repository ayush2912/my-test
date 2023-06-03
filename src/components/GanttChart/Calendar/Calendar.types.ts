export type TemporalView = "yearly" | "monthly" | "weekly";

export type CalendarWidth = {
  monthly: number;
  weekly: number;
  yearly: number;
};

export type ICalendarHeader = {
  monthly: IMonthlyHeader;
  weekly: IWeeklyHeader;
  yearly: IYearlyHeader;
};

export type IYearlyHeader = {
  year: string;
  months: { month: string; isThisMonth?: boolean }[];
}[];

export type IMonthlyHeader = {
  month: string;
  year: string;
  days: { day: number; isToday?: boolean }[];
}[];

export type IWeeklyHeader = {
  month: string;
  year: string;
  sundays: string[];
}[];

export type ICalendar = {
  earliestStartDate: Date;
  latestEndDate: Date;
  header: ICalendarHeader;
  width: CalendarWidth;
  offsetForToday: number;
};
