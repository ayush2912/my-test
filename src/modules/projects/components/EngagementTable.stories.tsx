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
    id: "asdf-23fedf2-eertgdfgsderf2f-esf3fes-f3",
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
        assignee: "Client",
      },
    ],
  },
  {
    id: "asdf-23ff2-ef2f-esf3fesdfhdfgh-f3",
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
        assignee: "Client",
      },
    ],
  },
  {
    id: "asdf-23fedf2-ef2f-qweqw-esf3fes-f3",
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
        assignee: "Client",
      },
      {
        type: "Task 1",
        startDate: new Date("2023-01-10T06:20:44.069Z"),
        dueDate: new Date("2023-01-10T06:20:44.069Z"),
        isOverdue: false,
        state: "IN_PROGRESS",
        assignee: "Consultant",
      },
      {
        type: "Task 1",
        startDate: new Date("2023-01-10T06:20:44.069Z"),
        dueDate: new Date("2023-01-10T06:20:44.069Z"),
        isOverdue: true,
        state: "IN_PROGRESS",
        assignee: "Consultant",
      },
      {
        type: "Task 1",
        startDate: new Date("2023-01-10T06:20:44.069Z"),
        dueDate: new Date("2023-01-10T06:20:44.069Z"),
        isOverdue: true,
        state: "COMPLETED",
        completedDate: new Date("2023-01-10T06:20:44.069Z"),
        assignee: "Consultant",
      },
    ],
  },
  {
    id: "asdf-23fedf2-ef2f-dfghdf-f3",
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
        assignee: "Consultant",
      },
    ],
  },
  {
    id: "asdf-23fsf3fdhfghfes-f3",
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
        assignee: "Consultant",
      },
    ],
  },
  {
    id: "asdf-23ghjhjhfed12312es-f3",
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
        assignee: "Consultant",
      },
    ],
  },
];

export const Primary: Story = {
  render: () => (
    <EngagementTable
      headers={EngagementTableHeaders}
      tableData={projectEngagementsTableData}
      onViewDocument={(id: string) => {
        console.log("hello this is document", id);
      }}
    />
  ),
};

export const EmptyTable: Story = {
  render: () => (
    <EngagementTable
      headers={EngagementTableHeaders}
      tableData={[]}
      onViewDocument={(id: string) => {
        console.log("hello this is document", id);
      }}
    />
  ),
};
