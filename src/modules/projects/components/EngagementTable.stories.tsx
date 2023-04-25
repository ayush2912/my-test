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
    startDate: "2023-01-10T06:20:44.069Z",
    dueData: "2030-01-05T08:52:29.962Z",
  },
  {
    name: "Engagement 1",
    startDate: "2023-01-10T06:20:44.069Z",
    dueData: "2030-01-05T08:52:29.962Z",
  },
  {
    name: "Engagement 1",
    startDate: "2023-01-10T06:20:44.069Z",
    dueData: "2030-01-05T08:52:29.962Z",
  },
  {
    name: "Engagement 1",
    startDate: "2023-01-10T06:20:44.069Z",
    dueData: "2030-01-05T08:52:29.962Z",
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
