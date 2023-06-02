import type { Meta, StoryFn } from "@storybook/react";

import { TaskBar } from "./TaskBar";
import { Task, IBar } from "../GanttChart.types";

export default {
  title: "Gantt Chart/Task Bar",
  component: TaskBar,
} as Meta;

const Template: StoryFn<{
  taskData: Task & { bar: IBar };
  isOverDue: boolean;
}> = (args) => <TaskBar {...args} />;

const notStartedTask = {
  id: "63fdfddfsdff223b24e19f12",
  engagementId: "63bd887fa62f3170407d1c42",
  type: "Some Important Task",
  startDate: "2021-02-11T00:00:00Z",
  dueDate: "2022-09-15T00:00:00Z",
  completedDate: "2022-09-24T08:22:20.099Z",
  isOverdue: true,
  state: "NOT_STARTED",
  stateHistory: [
    {
      state: "NOT_STARTED",
      stateUpdatedAt: "2019-08-24T14:15:22Z",
    },
  ],
  createdAt: "2023-04-11T14:15:22Z",
  updatedAt: "2023-04-24T14:15:22Z",
  bar: {
    offsetFromLeft: {
      monthly: 0,
      yearly: 0,
      weekly: 0,
    },
    width: {
      monthly: 200,
      yearly: 200,
      weekly: 200,
    },
  },
};

export const NotStarted = Template.bind({});
NotStarted.args = {
  taskData: notStartedTask,
  isOverDue: false,
};

export const InProgress = Template.bind({});
InProgress.args = {
  taskData: {
    ...notStartedTask,
    state: "IN_PROGRESS",
  },
  isOverDue: false,
};

export const Completed = Template.bind({});
Completed.args = {
  taskData: {
    ...notStartedTask,
    state: "COMPLETED",
  },
  isOverDue: false,
};
