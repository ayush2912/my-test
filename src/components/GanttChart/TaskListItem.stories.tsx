import type { Meta, StoryObj } from "@storybook/react";

import { TaskListItem } from "./TaskListItem";

const meta: Meta<typeof TaskListItem> = {
  title: "Gantt Chart/Side Panel/Task List Item",
  component: TaskListItem,
};

export default meta;

type Story = StoryObj<typeof TaskListItem>;

export const Default: Story = {
  render: () => (
    <TaskListItem name="Project Design Document" source="client" isOverDue />
  ),
};
