import { FunctionComponent, ReactNode } from "react";
import styled from "styled-components";

import Text from "./Text";

interface TooltipProps {
  text: string;
  children: ReactNode;
  position: string | null;
}

const TooltipContainer = styled.div`
  position: relative;
  display: flex;
`;

const TooltipCard = styled.span<{ position: string | null }>`
  visibility: hidden;
  background-color: ${(props) => props.theme.colors.background.card};
  box-shadow: ${(props) => props.theme.shadow.sm};

  text-align: center;
  white-space: nowrap;

  border-radius: 8px;
  padding: 4px 8px;

  position: absolute;
  z-index: 1;

  bottom: 125%;
  left: ${(props) => (props.position === "right" ? "100%" : "50%")};

  transform: translateX(-50%);

  opacity: 0;
  transition: opacity 0.3s;

  ${TooltipContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const Tooltip: FunctionComponent<TooltipProps> = ({
  text,
  children,
  position,
}) => {
  return (
    <TooltipContainer>
      {children}
      <TooltipCard position={position}>
        <Text type="smallTextBold">{text}</Text>
      </TooltipCard>
    </TooltipContainer>
  );
};

export default Tooltip;
