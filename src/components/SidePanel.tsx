import { ReactNode } from "react";
import styled, { css, keyframes } from "styled-components";

import { Overlay } from "./Overlay";

const slideOutAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

export const Drawer = styled.div<{ isOn: boolean }>`
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  right: ${({ isOn }) => (isOn ? "0" : "-672px")};
  width: 672px;
  background: white;
  transition: right 300ms ease-in-out;
  overflow: auto;
  ${({ isOn }) =>
    !isOn &&
    css`
      animation: ${slideOutAnimation} 300ms ease-out;
    `};
`;

export const SidePanel = ({
  isOn,

  children,
}: {
  isOn: boolean;

  children: ReactNode;
}) => {
  return (
    <>
      <Overlay isOpen={isOn} />
      <Drawer isOn={isOn}>{children}</Drawer>
    </>
  );
};
