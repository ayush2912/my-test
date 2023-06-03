import type { Meta, StoryObj } from "@storybook/react";

import { EngagementListItem } from "./EngagementListItem";
import { IMappedEngagement } from "./GanttChart.types";

const meta: Meta<typeof EngagementListItem> = {
  title: "Gantt Chart/Side Panel/Engagement List Item",
  component: EngagementListItem,
};

export default meta;

type Story = StoryObj<typeof EngagementListItem>;

const engagementMockData = {
  type: "Issuance",
  state: "IN_PROGRESS",
} as IMappedEngagement;

export const InProgress: Story = {
  render: () => <EngagementListItem data={engagementMockData} />,
};
