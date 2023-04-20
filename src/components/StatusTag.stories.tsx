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
        <StatusTag name="IN PROGRESS" type="information"></StatusTag>
        <StatusTag name="OVERDUE" type="warning"></StatusTag>
        <StatusTag name="COMPLETED" type="success"></StatusTag>
        <StatusTag name="DISCONTINUED" type="error"></StatusTag>
        <StatusTag name="NOT STARTED" type="disabled"></StatusTag>
      </div>
    );
  },
};
