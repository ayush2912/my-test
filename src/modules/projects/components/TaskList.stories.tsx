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
        name="Task 1"
        startDate="2023-01-10T06:20:44.069Z"
        dueDate="2030-01-05T08:52:29.962Z"
        status="COMPLETED"
      />
      <TaskList
        name="Task 2"
        startDate="2023-01-10T06:20:44.069Z"
        dueDate="2030-01-05T08:52:29.962Z"
        status="NOT_STARTED"
      />
      <TaskList
        name="Task 3"
        startDate="2023-01-10T06:20:44.069Z"
        dueDate="2030-01-05T08:52:29.962Z"
        status="IN_PROGRESS"
      />
      <TaskList
        name="Task 4"
        startDate="2023-01-10T06:20:44.069Z"
        dueDate="2030-01-05T08:52:29.962Z"
        status="DISCONTINUED"
      />
    </>
  ),
};
