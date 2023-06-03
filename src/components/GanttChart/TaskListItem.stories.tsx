import type { Meta, StoryObj } from "@storybook/react";

import TaskListItem from "./TaskListItem";

const meta: Meta<typeof TaskListItem> = {
  title: "Gantt Chart/Side Panel/Task List Item",
  component: TaskListItem,
};

export default meta;

type Story = StoryObj<typeof TaskListItem>;

const taskMockData = {
  id: "63b863d2fdbf66b24e1e2142314231fwdsfx9f12",
  engagementId: "63bd887fa62f3170407d1c42",
  type: "Project Design Document",
  startDate: "2021-02-11T00:00:00Z",
  dueDate: "2021-02-15T00:00:00Z",
  completedDate: "2021-02-13T00:00:00Z",
  isOverdue: true,
  state: "IN_PROGRESS",
  stateHistory: [
    {
      state: "IN_PROGRESS",
      stateUpdatedAt: "2019-08-24T14:15:22Z",
    },
  ],
  assignee: "Client",
  createdAt: "2023-04-11T14:15:22Z",
  updatedAt: "2023-04-24T14:15:22Z",
};

export const Default: Story = {
  render: () => <TaskListItem data={taskMockData} />,
};
