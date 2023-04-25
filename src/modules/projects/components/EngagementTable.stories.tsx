import type { Meta, StoryObj } from "@storybook/react";

import StatusTag from "@/components/StatusTag";
import Text from "@/components/Text";

import EngagementTable from "./EngagementTable";
import { EngagementTableHeaders } from "../constants/engagementTableHeaders";

const meta: Meta<typeof EngagementTable> = {
  title: "Projects/Components/Engagement Table",
  component: EngagementTable,
};

export default meta;
type Story = StoryObj<typeof EngagementTable>;

const projectEngagementsTableData = [
  {
    name: "Engagement 1",
    startDate: "hello",
    dueData: "yay",
  },
  {
    name: "Engagement 1",
    startDate: "hello",
    dueData: "yay",
  },
  {
    name: "Engagement 1",
    startDate: "hello",
    dueData: "yay",
  },
  {
    name: "Engagement 1",
    startDate: "hello",
    dueData: "yay",
  },
];

export const Primary: Story = {
  render: () => (
    <EngagementTable
      headers={EngagementTableHeaders}
      tableData={projectEngagementsTableData}
    ></EngagementTable>
  ),
};
