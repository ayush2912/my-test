import type { Meta, StoryObj } from "@storybook/react";

import StatusTag from "./StatusTag";

const meta: Meta<typeof StatusTag> = {
  title: "StatusTag",
  component: StatusTag,
};

export default meta;
type Story = StoryObj<typeof StatusTag>;

export const Normal: Story = {
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "200px",
        }}
      >
        <StatusTag name="In Progress" type="information"></StatusTag>
        <StatusTag name="In Progress" type="information"></StatusTag>
        <StatusTag name="In Progress" type="information"></StatusTag>
      </div>
    );
  },
};
