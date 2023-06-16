// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import styled from "styled-components";

import Button from "./Button";
import Modal from "./Modal";
import Text from "./Text";

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ContentDiv = styled.div`
  max-width: 414px;
`;

export const Normal: Story = {
  render: () => {
    const [modalStatus, setModalStatus] = useState(false);
    return (
      <div style={{ width: 500 }}>
        <Button size="large" onClick={() => setModalStatus(true)}>
          Open Modal
        </Button>
        <Modal
          isOpen={modalStatus}
          onClose={() => setModalStatus(false)}
          title="Note"
        >
          <ContentDiv>
            <Text type="body" color="default">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor in. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiu
            </Text>
          </ContentDiv>
        </Modal>
      </div>
    );
  },
};
