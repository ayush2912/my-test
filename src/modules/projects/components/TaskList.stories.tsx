import type { Meta, StoryObj } from "@storybook/react";

import TaskList from "./TaskList";

const meta: Meta<typeof TaskList> = {
  component: TaskList,
};

export default meta;
type Story = StoryObj<typeof TaskList>;

export const Primary: Story = {
  render: () => (
    <>
      <TaskList
        isOverdue={true}
        type="Task 1"
        startDate={new Date("2023-01-10T06:20:44.069Z")}
        dueDate={new Date("2030-01-05T08:52:29.962Z")}
        completedDate={new Date("2030-01-07T08:52:29.962Z")}
        state="COMPLETED"
        assignee="Client"
      />
      <TaskList
        isOverdue={true}
        type="Task 2"
        startDate={new Date("2023-01-10T06:20:44.069Z")}
        dueDate={new Date("2030-10-05T08:52:29.962Z")}
        state="NOT_STARTED"
        assignee="Client"
      />
      <TaskList
        isOverdue={false}
        type="Task 3"
        startDate={new Date("2023-01-10T06:20:44.069Z")}
        dueDate={new Date("2030-01-05T08:52:29.962Z")}
        state="IN_PROGRESS"
        assignee="Client"
      />
      <TaskList
        isOverdue={false}
        type="Task 7"
        startDate={new Date("2023-01-10T06:20:44.069Z")}
        dueDate={new Date("2030-01-05T08:52:29.962Z")}
        state="DISCONTINUED"
        assignee="Client"
      />
      <TaskList
        isOverdue={true}
        type="Task 5"
        startDate={new Date("2023-01-10T06:20:44.069Z")}
        dueDate={new Date("2023-04-05T08:52:29.962Z")}
        state="IN_PROGRESS"
        assignee="Client"
      />
      <TaskList
        isOverdue={false}
        type="Task 6"
        startDate={new Date("2023-01-10T06:20:44.069Z")}
        dueDate={new Date("2030-01-05T08:52:29.962Z")}
        state="COMPLETED"
        assignee="Client"
      />
    </>
  ),
};
