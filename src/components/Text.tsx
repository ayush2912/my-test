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
  | "success"
  | "error";

const StyledText = styled.p<{
  type: TypeStyle;
  color: TextColor;
  hoverStyles?: string;
  ellipsis?: boolean;
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

  ${(props) =>
    props.ellipsis &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `};
`;

export default forwardRef(function Text(
  {
    type,
    color = "default",
    children,
    hoverStyles,
    ellipsis,
  }: {
    type: TypeStyle;
    color?: TextColor;
    children: ReactNode;
    hoverStyles?: string;
    ellipsis?: boolean;
  },
  ref?: React.Ref<HTMLDivElement>,
) {
  return (
    <StyledText
      ref={ref}
      type={type}
      color={color}
      hoverStyles={hoverStyles}
      ellipsis={ellipsis}
    >
      {children}
    </StyledText>
  );
});
