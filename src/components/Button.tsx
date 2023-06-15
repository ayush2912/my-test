import { ReactNode } from "react";
import styled, { DefaultTheme, css, useTheme } from "styled-components";

type IStyledButtonProps = {
  isIconButton?: boolean;
  iconPosition?: string;
  textColor?: string;
  border?: string;
  hoverBgColor?: string;
  hoverBorderColor?: string;
  bgColor?: string;
  pressedBgColor?: string;
  disabled?: boolean;
  buttonPadding: string;
};

const StyledButton = styled.button<IStyledButtonProps>`
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.bgColor || props.theme.colors.primary[500]};
  color: ${(props) => props.textColor || props.theme.colors.text.white};
  border: ${(props) => (props.border ? props.border : "none")};
  border-radius: 8px;

  cursor: pointer;
  font-size: ${(props) => props.theme.typography.button.size}px;
  font-weight: ${(props) => props.theme.typography.button.weight};
  line-height: ${(props) => props.theme.typography.button.lineHeight}px;
  transition: background-color 0.3s, color 0.3s;

  ${(props) => props.buttonPadding}

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.hoverBgColor || props.theme.colors.primary[600]};
    border-color: ${(props) =>
      props.hoverBorderColor || props.theme.colors.primary[600]};
  }

  &:active:not(:disabled) {
    background-color: ${(props) =>
      props.pressedBgColor || props.theme.colors.primary[700]};
  }

  &:focus:not(:disabled) {
    box-shadow: 0px 0px 0px 4px #b1c8f9;
  }

  ${(props) =>
    props.iconPosition === "right" &&
    css`
      padding-left: 4px;
    `}
  ${(props) =>
    props.iconPosition === "left" &&
    css`
      padding-left: 4px;
    `}
   
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.33;
      cursor: not-allowed;
    `}
`;

const ButtonContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export type IButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  isIconButton?: boolean;
  type?: "primary" | "secondary" | "ghost";
  lightBorderColor?: boolean;
  iconPosition?: "left" | "right";
  size?: "xsmall" | "small" | "large";
  onClick: () => void;
};

export default function Button({
  size = "small",
  type = "primary",
  iconPosition,
  isIconButton,
  disabled,
  lightBorderColor,
  children,
  onClick,
}: IButtonProps) {
  const theme: DefaultTheme = useTheme();

  const selectedButtonStyles = {
    primary: {
      textColor: theme.colors.text.white,
      bgColor: theme.colors.primary[500],
      hoverBgColor: theme.colors.primary[600],
      pressedBgColor: theme.colors.primary[700],
    },
    secondary: {
      textColor: theme.colors.text.default,
      border: lightBorderColor ? "1px solid #e1e4e8" : "1px solid #8992A3",
      bgColor: theme.colors.neutral[0],
      hoverBgColor: theme.colors.neutral[100],
      hoverBorderColor: theme.colors.neutral[700],
      pressedBgColor: theme.colors.neutral[200],
    },
    ghost: {
      textColor: theme.colors.text.default,
      bgColor: "transparent",
      hoverBgColor: theme.colors.neutral[100],
      pressedBgColor: theme.colors.neutral[200],
    },
  }[type];

  const selectedPaddingBlock = {
    xsmall: "padding-block: 4px;",
    small: "padding-block: 4px;",
    large: "padding-block: 8px;",
  }[size];

  const selectedPaddingInline = isIconButton
    ? {
        xsmall: "padding-inline: 4px;",
        small: "padding-inline: 4px;",
        large: "padding-inline: 8px;",
      }[size]
    : {
        xsmall: "padding-inline: 8px;",
        small: "padding-inline: 12px;",
        large: "padding-inline: 16px;",
      }[size];

  const buttonPadding = selectedPaddingBlock + selectedPaddingInline;

  return (
    <StyledButton
      isIconButton={isIconButton}
      disabled={disabled}
      {...selectedButtonStyles}
      onClick={onClick}
      iconPosition={iconPosition}
      buttonPadding={buttonPadding}
    >
      <ButtonContentWrapper>{children}</ButtonContentWrapper>
    </StyledButton>
  );
}
