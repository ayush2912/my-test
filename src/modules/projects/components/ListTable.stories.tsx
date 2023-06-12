import type { Meta, StoryObj } from "@storybook/react";

import ListTable from "./ListTable";

const meta: Meta<typeof ListTable> = {
  title: "Projects/Components/ListTable",
  component: ListTable,
};

export default meta;
type Story = StoryObj<typeof ListTable>;

export const Default: Story = {
  render: () => <ListTable />,
};
