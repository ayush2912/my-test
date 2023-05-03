import type { Meta, StoryObj } from "@storybook/react";

import TaskList from "./TaskList";

const meta: Meta<typeof TaskList> = {
  title: "Projects/Components/Task List",
  component: TaskList,
};

export default meta;
type Story = StoryObj<typeof TaskList>;

export const Primary: Story = {
  render: () => (
    <>
      <TaskList
        isOverdue={false}
        type="Task 1"
        startDate={new Date("2023-01-10T06:20:44.069Z")}
        dueDate={new Date("2030-01-05T08:52:29.962Z")}
        state="COMPLETED"
      />
      <TaskList
        isOverdue={false}
        type="Task 2"
        startDate={new Date("2023-01-10T06:20:44.069Z")}
        dueDate={new Date("2030-01-05T08:52:29.962Z")}
        state="NOT_STARTED"
      />
      <TaskList
        isOverdue={false}
        type="Task 3"
        startDate={new Date("2023-01-10T06:20:44.069Z")}
        dueDate={new Date("2030-01-05T08:52:29.962Z")}
        state="IN_PROGRESS"
      />
      <TaskList
        isOverdue={false}
        type="Task 7"
        startDate={new Date("2023-01-10T06:20:44.069Z")}
        dueDate={new Date("2030-01-05T08:52:29.962Z")}
        state="DISCONTINUED"
      />
      <TaskList
        isOverdue={true}
        type="Task 5"
        startDate={new Date("2023-01-10T06:20:44.069Z")}
        dueDate={new Date("2030-01-05T08:52:29.962Z")}
        state="IN_PROGRESS"
      />
      <TaskList
        isOverdue
        type="Task 6"
        startDate={new Date("2023-01-10T06:20:44.069Z")}
        dueDate={new Date("2030-01-05T08:52:29.962Z")}
        state="COMPLETED"
      />
    </>
  ),
};
