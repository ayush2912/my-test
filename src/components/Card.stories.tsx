// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";

import Card from "./Card";

const meta: Meta<typeof Card> = {
  title: "Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Normal: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <Card>Put your card content here</Card>
    </div>
  ),
};
