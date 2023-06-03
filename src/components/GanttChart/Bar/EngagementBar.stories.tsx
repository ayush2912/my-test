import type { Meta, StoryFn } from "@storybook/react";

import { EngagementBar } from "./EngagementBar";
import { IMappedEngagement } from "../GanttChart.types";

export default {
  title: "Gantt Chart/EngagementBar",
  component: EngagementBar,
} as Meta;

const Template: StoryFn<{
  engagementData: IMappedEngagement;
}> = (args) => <EngagementBar {...args} />;

const engagementData = {
  id: "yourId",
  projectId: "yourProjectId",
  type: "Issuance",
  startDate: "2023-06-01T00:00:00Z",
  dueDate: "2023-06-10T00:00:00Z",
  completedDate: null,
  notes: "Your notes here",
  state: "IN_PROGRESS",
  stateHistory: [
    {
      state: "State 1",
      stateUpdatedAt: "2023-05-15T10:30:00Z",
    },
    {
      state: "State 2",
      stateUpdatedAt: "2023-05-20T14:45:00Z",
    },
  ],
  isOverdue: false,
  attributes: [
    {
      name: "string",
      type: "string",
      value: "string",
      key: "string",
    },
  ],
  createdAt: "2023-05-01T09:00:00Z",
  updatedAt: "2023-05-30T16:20:00Z",
  bar: {
    offsetFromLeft: {
      monthly: 0,
      yearly: 0,
      weekly: 0,
    },
    width: {
      monthly: 400,
      yearly: 400,
      weekly: 400,
    },
  },
  onViewClick: () => console.log("hi"),
  tasks: [],
};

export const Default = Template.bind({});
Default.args = {
  engagementData: engagementData,
};
