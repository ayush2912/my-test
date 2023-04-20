import { ReactNode } from "react";
import styled, { css } from "styled-components";

type ButtonProps = {
  backgroundColor?: string;
  textColor?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  pressedBackgroundColor?: string;
  pressedTextColor?: string;
  focusedBackgroundColor?: string;
  focusedTextColor?: string;
  disabledBackgroundColor?: string;
  disabledTextColor?: string;
  disabled?: boolean;
};

const StyledButton = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.backgroundColor || props.theme.colors.primary[500]};
  color: ${(props) => props.textColor || "white"};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover:not(:disabled) {
    background-color: ${(props) => props.hoverBackgroundColor || "lightblue"};
    color: ${(props) => props.hoverTextColor || "white"};
  }

  &:active:not(:disabled) {
    background-color: ${(props) => props.pressedBackgroundColor || "red"};
    color: ${(props) => props.pressedTextColor || "pink"};
  }

  &:focus:not(:disabled) {
    outline: none;
    color: ${(props) => props.focusedTextColor || "white"};
  }

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      background-color: ${props.disabledBackgroundColor || "grey"};
      color: ${props.disabledTextColor || "white"};
      &:hover,
      &:active,
      &:focus {
        background-color: ${props.disabledBackgroundColor || "grey"};
        color: ${props.disabledTextColor || "white"};
      }
    `}
`;

export default function Button({ children }: { children: ReactNode }) {
  return <StyledButton>{children}</StyledButton>;
}
