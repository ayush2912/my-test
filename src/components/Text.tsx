import { ReactNode } from "react";
import styled from "styled-components";

type TypeStyle = "heading1" | "heading2" | "heading3";

const StyledText = styled.span<{ type: TypeStyle }>`
  font-size: 12px;
`;

export default function Text({
  type,
  children,
}: {
  type: TypeStyle;
  children: ReactNode;
}) {
  return <StyledText type="he">{children}</StyledText>;
}
