import { ReactNode } from "react";
import styled from "styled-components";

type TypeStyle =
  | "heading1"
  | "heading2"
  | "heading3"
  | "button"
  | "body"
  | "bodyBold"
  | "caption"
  | "captionBold"
  | "smallText"
  | "smallTextBold"
  | "linkText"
  | "linkTextBold";

type TextColor = "default" | "subdued" | "disabled" | "white";

const StyledText = styled.span<{ type: TypeStyle; color: TextColor }>`
  font-size: ${(props) => props.theme.typography[props.type].size}px;
  font-weight: ${(props) => props.theme.typography[props.type].weight};
  line-height: ${(props) => props.theme.typography[props.type].lineHeight}px;
  color: ${(props) => props.theme.colors.text[props.color]};
`;

export default function Text({
  type,
  color = "default",
  children,
}: {
  type: TypeStyle;
  color?: TextColor;
  children: ReactNode;
}) {
  return (
    <StyledText type={type} color={color}>
      {children}
    </StyledText>
  );
}
