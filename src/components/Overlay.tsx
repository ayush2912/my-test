import styled, { css } from "styled-components";

export const Overlay = styled.section<{ isOpen: boolean }>`
  position: fixed;
  z-index: 9;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  background: #363c46;
  opacity: ${({ isOpen }) => (isOpen ? 0.5 : 0)};
  transition: opacity 300ms ease-in-out;

  ${({ isOpen }) =>
    !isOpen &&
    css`
      pointer-events: none;
    `};
`;
