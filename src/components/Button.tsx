import { ReactNode } from "react";
import styled, { DefaultTheme, css, useTheme } from "styled-components";

type ButtonProps = {
  large?: boolean;
  textColor?: string;
  backgroundColor?: string;
  border?: string;
  hoverBackgroundColor?: string;
  pressedBackgroundColor?: string;
  disabled?: boolean;
};

const StyledButton = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.backgroundColor || props.theme.colors.primary[500]};
  color: ${(props) => props.textColor || props.theme.colors.text.white};
  border: ${(props) => (props.border ? props.border : "none")};
  border-radius: 8px;
  padding: 4px 12px;
  cursor: pointer;
  font-size: ${(props) => props.theme.typography.button.size}px;
  font-weight: ${(props) => props.theme.typography.button.weight};
  line-height: ${(props) => props.theme.typography.button.lineHeight}px;
  transition: background-color 0.3s, color 0.3s;

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.hoverBackgroundColor || props.theme.colors.primary[600]};
  }

  &:active:not(:disabled) {
    background-color: ${(props) =>
      props.pressedBackgroundColor || props.theme.colors.primary[700]};
  }

  &:focus:not(:disabled) {
    box-shadow: 0px 0px 0px 4px #b1c8f9;
  }

  ${(props) =>
    props.large &&
    css`
      padding: 8px 16px;
    `}

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.33;
      cursor: not-allowed;
    `}
`;

export default function Button({
  children,
  disabled,
  large,
  type = "primary",
}: {
  children: ReactNode;
  disabled?: boolean;
  large?: boolean;
  type?: "primary" | "secondary" | "ghost";
}) {
  const theme: DefaultTheme = useTheme();

  const selectedButtonStyles: ButtonProps = {
    primary: {
      textColor: theme.colors.text.white,
      backgroundColor: theme.colors.primary[500],
      hoverBackgroundColor: theme.colors.primary[600],
      pressedBackgroundColor: theme.colors.primary[700],
    },
    secondary: {
      textColor: theme.colors.text.default,
      border: "1px solid #8992A3",
      backgroundColor: theme.colors.neutral[0],
      hoverBackgroundColor: theme.colors.neutral[100],
      pressedBackgroundColor: theme.colors.neutral[200],
    },
    ghost: {
      textColor: theme.colors.text.default,
      backgroundColor: "transparent",
      hoverBackgroundColor: theme.colors.neutral[100],
      pressedBackgroundColor: theme.colors.neutral[200],
    },
  }[type];

  return (
    <StyledButton large={large} disabled={disabled} {...selectedButtonStyles}>
      {children}
    </StyledButton>
  );
}