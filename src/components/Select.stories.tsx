import type { Meta, StoryObj } from "@storybook/react";

import Select from "./Select";

const meta: Meta<typeof Select> = {
  title: "Select",
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Primary: Story = {
  render: () => (
    <Select
      isPrimary={true}
      placeholder="Placeholder"
      selected={{ value: "SelecteValue", displayValue: "Display Value" }}
    />
  ),
};

export const Secondary: Story = {
  render: () => <Select isPrimary={false} placeholder="Placeholder" />,
};
