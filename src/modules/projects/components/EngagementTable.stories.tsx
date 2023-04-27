import type { Meta, StoryObj } from "@storybook/react";

import StatusTag from "@/components/StatusTag";
import Text from "@/components/Text";

import EngagementTable, { EngagementItem } from "./EngagementTable";
import { EngagementTableHeaders } from "../constants/engagementTableHeaders";

const meta: Meta<typeof EngagementTable> = {
  title: "Projects/Components/Engagement Table",
  component: EngagementTable,
};

export default meta;
type Story = StoryObj<typeof EngagementTable>;

const projectEngagementsTableData: EngagementItem[] = [
  {
    name: "Engagement 1",
    state: "COMPLETED",
    startDate: new Date("2023-01-10T06:20:44.069Z"),
    dueDate: new Date("2030-01-05T08:52:29.962Z"),
    note: "I am a note",
    document: 20,
    attributes: [
      {
        label: "Date of registration",
        value: "",
      },
      {
        label: "Registry ID",
        value: "",
      },
      {
        label: "Registry URL",
        value: "https://registry.goldstandard.org/projects/details/48",
      },
    ],
    tasks: [
      {
        name: "Task 1",
        startDate: new Date("2023-01-10T06:20:44.069Z"),
        dueDate: new Date("2023-01-10T06:20:44.069Z"),
        status: "COMPLETED",
      },
    ],
  },
  {
    name: "Engagement 1",
    state: "COMPLETED",
    startDate: new Date("2023-01-10T06:20:44.069Z"),
    dueDate: new Date("2030-01-05T08:52:29.962Z"),
    note: "I am a note",
    document: 20,
    attributes: [{ label: "hello", value: "hi" }],
    tasks: [
      {
        name: "Task 1",
        startDate: new Date("2023-01-10T06:20:44.069Z"),
        dueDate: new Date("2023-01-10T06:20:44.069Z"),
        status: "COMPLETED",
      },
      {
        name: "Task 1",
        startDate: new Date("2023-01-10T06:20:44.069Z"),
        dueDate: new Date("2023-01-10T06:20:44.069Z"),
        status: "IN_PROGRESS",
      },
      {
        name: "Task 1",
        startDate: new Date("2023-01-10T06:20:44.069Z"),
        dueDate: new Date("2023-01-10T06:20:44.069Z"),
        status: "COMPLETED",
      },
    ],
  },
  {
    name: "Engagement 1",
    state: "COMPLETED",
    startDate: new Date("2023-01-10T06:20:44.069Z"),
    dueDate: new Date("2030-01-05T08:52:29.962Z"),
    note: "I am a note",
    document: 20,
    attributes: [{ label: "hello", value: "hi" }],
    tasks: [
      {
        name: "Task 1",
        startDate: new Date("2023-01-10T06:20:44.069Z"),
        dueDate: new Date("2023-01-10T06:20:44.069Z"),
        status: "COMPLETED",
      },
    ],
  },
  {
    name: "Engagement 1",
    state: "COMPLETED",
    startDate: new Date("2023-01-10T06:20:44.069Z"),
    dueDate: new Date("2030-01-05T08:52:29.962Z"),
    note: "I am a note",
    document: 20,
    attributes: [{ label: "hello", value: "hi" }],
    tasks: [
      {
        name: "Task 1",
        startDate: new Date("2023-01-10T06:20:44.069Z"),
        dueDate: new Date("2023-01-10T06:20:44.069Z"),
        status: "COMPLETED",
      },
    ],
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
