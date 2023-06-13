import moment from "moment";

import { ETaskState } from "../modules/projects/constants/taskState";

export function getOverdueTooltipText({
  state,
  startDate,
  dueDate,
  completedDate,
}: {
  state: string;
  startDate: string | Date | undefined | null;
  dueDate: string | Date | undefined | null;
  completedDate: string | Date | undefined | null;
}) {
  const beginningDate = moment(
    state === ETaskState.NOT_STARTED ? startDate : dueDate,
  );
  const endDate = moment(
    state === ETaskState.COMPLETED ? completedDate : new Date(),
  );

  const monthDiff = moment.duration(endDate.diff(beginningDate)).months();
  const dayDiff = moment.duration(endDate.diff(beginningDate)).days();

  return monthDiff
    ? `${monthDiff}-${monthDiff > 1 ? "Months" : "Month"} delay`
    : `${dayDiff}-${dayDiff > 1 ? "Days" : "Day"} delay`;
}
