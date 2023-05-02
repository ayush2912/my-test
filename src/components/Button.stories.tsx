import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary = () => (
  <Button
    type="primary"
    onClick={() => {
      console.log("primary button click");
    }}
  >
    Click Me
  </Button>
);

export const Secondary: Story = {
  render: () => (
    <Button
      type="secondary"
      onClick={() => {
        console.log("secondary button click");
      }}
    >
      Click Me
    </Button>
  ),
};

export const Ghost: Story = {
  render: () => (
    <Button
      type="ghost"
      onClick={() => {
        console.log("ghost button click");
      }}
    >
      Click Me
    </Button>
  ),
};
