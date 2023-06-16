import type { Meta, StoryObj } from "@storybook/react";

import StatusTag from "./StatusTag";

const meta: Meta<typeof StatusTag> = {
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
        <StatusTag name="IN PROGRESS" type="information" />
        <StatusTag name="OVERDUE" type="warning" />
        <StatusTag name="COMPLETED" type="success" />
        <StatusTag name="DISCONTINUED" type="error" />
        <StatusTag name="NOT STARTED" type="disabled" />
      </div>
    );
  },
};
