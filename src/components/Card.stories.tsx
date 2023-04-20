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
      <Card>
        <div>Put your card content here </div>
        <div>Hello I am a card content</div>
        <div>content 101</div>
      </Card>
    </div>
  ),
};
