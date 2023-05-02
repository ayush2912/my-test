import { ReactNode } from "react";
import styled from "styled-components";

import Button from "./Button";
import Card from "./Card";
import Text from "./Text";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

//TODO: update the box shadow based on design system/figma
const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(54, 60, 70, 0.5);
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 100;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  border-radius: 24px;
  background-color: #ffffff;
`;

const Footer = styled.div`
  display: flex;
  justify-content: end;
`;
const Content = styled.div`
  margin: 24px 0px;
`;
const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  //TODO: update the styles for title and button
  return (
    <Overlay isOpen={isOpen}>
      <ModalContent>
        <Card>
          {title && (
            <Text type="heading3" color="default">
              {title}
            </Text>
          )}
          <Content>{children}</Content>
          <Footer>
            <Button large onClick={onClose}>
              <Text type="button" color="white">
                Close
              </Text>
            </Button>
          </Footer>
        </Card>
      </ModalContent>
    </Overlay>
  );
};

export default Modal;
