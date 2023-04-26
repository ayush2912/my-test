import { ReactNode } from "react";
import styled from "styled-components";

import Button from "./Button";
import Card from "./Card";

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
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
`;

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  //TODO: update the styles for title and button
  return (
    <Overlay isOpen={isOpen}>
      <ModalContent>
        <Card>
          {title && <h2>{title}</h2>}
          {children}
          <Button onClick={onClose}>Close</Button>
        </Card>
      </ModalContent>
    </Overlay>
  );
};

export default Modal;
