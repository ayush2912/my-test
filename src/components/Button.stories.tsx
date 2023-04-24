import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => <Button type="primary">Click Me</Button>,
};

export const Secondary: Story = {
  render: () => <Button type="secondary">Click Me</Button>,
};

export const Ghost: Story = {
  render: () => <Button type="ghost">Click Me</Button>,
};
