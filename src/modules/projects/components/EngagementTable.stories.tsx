import type { Meta, StoryObj } from "@storybook/react";

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
    completedDate: new Date("2030-01-05T08:52:29.962Z"),
    notes: "I am a note",
    document: 20,
    isOverdue: false,
    attributes: [
      {
        name: "Date of registration",
        value: "",
        type: "datetime",
      },
      {
        name: "Registry ID",
        value: "",
        type: "string",
      },
      {
        name: "Registry URL",
        value: "https://registry.goldstandard.org/projects/details/48",
        type: "url",
      },
    ],
    tasks: [
      {
        type: "Task 1",
        startDate: new Date("2023-01-10T06:20:44.069Z"),
        dueDate: new Date("2023-01-10T06:20:44.069Z"),
        state: "COMPLETED",
        completedDate: new Date("2023-01-10T06:20:44.069Z"),
        isOverdue: false,
      },
    ],
  },
  {
    name: "Engagement 1",
    state: "OVERDUE",
    startDate: new Date("2023-01-10T06:20:44.069Z"),
    dueDate: new Date("2030-01-05T08:52:29.962Z"),
    isOverdue: true,
    notes: "",
    document: 20,
    attributes: [{ name: "hello", value: "hi", type: "string" }],
    tasks: [
      {
        type: "Task 1",
        startDate: new Date("2023-01-10T06:20:44.069Z"),
        dueDate: new Date("2023-01-10T06:20:44.069Z"),
        state: "COMPLETED",
        completedDate: new Date("2023-01-10T06:20:44.069Z"),
        isOverdue: false,
      },
    ],
  },
  {
    name: "Engagement 1",
    state: "IN_PROGRESS",
    startDate: new Date("2023-01-10T06:20:44.069Z"),
    dueDate: new Date("2030-01-05T08:52:29.962Z"),
    isOverdue: false,
    notes: "I am a note",
    document: 20,
    attributes: [{ name: "hello", value: "hi", type: "string" }],
    tasks: [
      {
        type: "Task 1",
        startDate: new Date("2023-01-10T06:20:44.069Z"),
        dueDate: new Date("2023-01-10T06:20:44.069Z"),
        state: "COMPLETED",
        completedDate: new Date("2023-01-10T06:20:44.069Z"),
        isOverdue: false,
      },
      {
        type: "Task 1",
        startDate: new Date("2023-01-10T06:20:44.069Z"),
        dueDate: new Date("2023-01-10T06:20:44.069Z"),
        isOverdue: false,
        state: "IN_PROGRESS",
      },
      {
        type: "Task 1",
        startDate: new Date("2023-01-10T06:20:44.069Z"),
        dueDate: new Date("2023-01-10T06:20:44.069Z"),
        isOverdue: true,
        state: "IN_PROGRESS",
      },
      {
        type: "Task 1",
        startDate: new Date("2023-01-10T06:20:44.069Z"),
        dueDate: new Date("2023-01-10T06:20:44.069Z"),
        isOverdue: true,
        state: "COMPLETED",
        completedDate: new Date("2023-01-10T06:20:44.069Z"),
      },
    ],
  },
  {
    name: "Engagement 1",
    state: "NOT_STARTED",
    startDate: new Date("2023-01-10T06:20:44.069Z"),
    dueDate: new Date("2030-01-05T08:52:29.962Z"),
    isOverdue: false,
    notes: "I am a note",
    document: 0,
    attributes: [{ name: "hello", value: "hi", type: "string" }],
    tasks: [
      {
        type: "Task 1",
        startDate: new Date("2023-01-10T06:20:44.069Z"),
        dueDate: new Date("2023-01-10T06:20:44.069Z"),
        isOverdue: false,
        state: "COMPLETED",
        completedDate: new Date("2023-01-10T06:20:44.069Z"),
      },
    ],
  },
  {
    name: "Engagement 1",
    state: "DISCONTINUED",
    startDate: new Date("2023-01-10T06:20:44.069Z"),
    dueDate: new Date("2030-01-05T08:52:29.962Z"),
    isOverdue: false,
    notes: "",
    document: 0,
    attributes: [{ name: "hello", value: "hi", type: "string" }],
    tasks: [
      {
        type: "Task 1",
        startDate: new Date("2023-01-10T06:20:44.069Z"),
        dueDate: new Date("2023-01-10T06:20:44.069Z"),
        state: "COMPLETED",
        isOverdue: false,
        completedDate: new Date("2023-01-10T06:20:44.069Z"),
      },
    ],
  },
  {
    name: "Engagement 3",
    state: "COMPLETED",
    startDate: new Date("2023-01-10T06:20:44.069Z"),
    dueDate: new Date("2030-01-05T08:52:29.962Z"),
    completedDate: new Date("2030-01-05T08:52:29.962Z"),
    notes: "I am a note",
    document: 20,
    isOverdue: true,
    attributes: [
      {
        name: "Date of registration",
        value: "",
        type: "string",
      },
      {
        name: "Registry ID",
        value: "2030-01-05T08:52:29.962Z",
        type: "datetime",
      },
      {
        name: "Registry URL",
        value: "https://registry.goldstandard.org/projects/details/48",
        type: "url",
      },
    ],
    tasks: [
      {
        type: "Task 1",
        startDate: new Date("2023-01-10T06:20:44.069Z"),
        dueDate: new Date("2023-01-10T06:20:44.069Z"),
        state: "COMPLETED",
        completedDate: new Date("2023-01-10T06:20:44.069Z"),
        isOverdue: false,
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

export const EmptyTable: Story = {
  render: () => (
    <EngagementTable
      headers={EngagementTableHeaders}
      tableData={[]}
    ></EngagementTable>
  ),
};
