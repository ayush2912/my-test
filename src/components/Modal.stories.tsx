// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import Modal from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Modal",
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Normal: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <Modal
        isOpen={true}
        onClose={() => {
          console.log("closed");
        }}
        title="Note"
      >
        <p>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiu`}{" "}
        </p>
      </Modal>
    </div>
  ),
};
