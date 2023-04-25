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
        startDate="DD/MM/YYY"
        dueDate="DD/MM/YYY"
        status="COMPLETED"
      />
      <TaskList
        name="Task 2"
        startDate="DD/MM/YYY"
        dueDate="DD/MM/YYY"
        status="NOT_STARTED"
      />
      <TaskList
        name="Task 3"
        startDate="DD/MM/YYY"
        dueDate="DD/MM/YYY"
        status="IN_PROGRESS"
      />
      <TaskList
        name="Task 4"
        startDate="DD/MM/YYY"
        dueDate="DD/MM/YYY"
        status="COMPLETED"
      />
      <TaskList
        name="Task 5"
        startDate="DD/MM/YYY"
        dueDate="DD/MM/YYY"
        status="COMPLETED"
      />
    </>
  ),
};
