import { ReactNode, forwardRef } from "react";
import styled, { css } from "styled-components";

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

type TextColor =
  | "primary"
  | "default"
  | "subdued"
  | "disabled"
  | "white"
  | "warning"
  | "success";

const StyledText = styled.span<{
  type: TypeStyle;
  color: TextColor;
  hoverStyles?: string;
}>`
  font-size: ${(props) => props.theme.typography[props.type].size}px;
  font-weight: ${(props) => props.theme.typography[props.type].weight};
  font-family: "Open Sans";
  line-height: ${(props) => props.theme.typography[props.type].lineHeight}px;
  color: ${(props) => props.theme.colors.text[props.color]};
  ${(props) =>
    props.hoverStyles &&
    css`
      &:hover {
        ${props.hoverStyles};
      }
    `};
`;

export default forwardRef(function Text(
  {
    type,
    color = "default",
    children,
    hoverStyles,
  }: {
    type: TypeStyle;
    color?: TextColor;
    children: ReactNode;
    hoverStyles?: string;
  },
  ref?: React.Ref<HTMLDivElement>,
) {
  return (
    <StyledText ref={ref} type={type} color={color} hoverStyles={hoverStyles}>
      {children}
    </StyledText>
  );
});
