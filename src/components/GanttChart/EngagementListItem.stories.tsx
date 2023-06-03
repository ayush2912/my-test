import type { Meta, StoryObj } from "@storybook/react";

import { EngagementListItem } from "./EngagementListItem";

const meta: Meta<typeof EngagementListItem> = {
  title: "Gantt Chart/Side Panel/Engagement List Item",
  component: EngagementListItem,
};

export default meta;

type Story = StoryObj<typeof EngagementListItem>;

export const InProgress: Story = {
  render: () => (
    <EngagementListItem
      type="Issuance"
      state="IN_PROGRESS"
      onClick={() => console.log("hello")}
    />
  ),
};
