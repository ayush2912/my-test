import { FunctionComponent, ReactNode } from "react";
import styled from "styled-components";

import Text from "./Text";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const TooltipContainer = styled.div`
  position: relative;
  display: flex;
`;

const TooltipCard = styled.span`
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
  left: 50%;
  transform: translateX(-50%);

  opacity: 0;
  transition: opacity 0.3s;

  ${TooltipContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const Tooltip: FunctionComponent<TooltipProps> = ({ text, children }) => {
  return (
    <TooltipContainer>
      {children}
      <TooltipCard>
        <Text type="smallTextBold">{text}</Text>
      </TooltipCard>
    </TooltipContainer>
  );
};

export default Tooltip;
