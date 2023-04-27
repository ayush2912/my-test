// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import Button from "./Button";
import Modal from "./Modal";
import Text from "./Text";

const meta: Meta<typeof Modal> = {
  title: "Modal",
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Normal: Story = {
  render: () => {
    const [modalStatus, setModalStatus] = useState(false);
    return (
      <div style={{ width: 500 }}>
        <Button large onClick={() => setModalStatus(true)}>
          Open Modal
        </Button>
        <Modal
          isOpen={modalStatus}
          onClose={() => setModalStatus(false)}
          title="Note"
        >
          <Text type="body" color="default">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor in. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiu
          </Text>
        </Modal>
      </div>
    );
  },
};
