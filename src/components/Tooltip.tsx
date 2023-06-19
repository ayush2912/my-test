import {
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const TooltipContainer = styled.div`
  position: relative;
  display: flex;
`;

const TooltipSpan = styled.span`
  background-color: ${(props) => props.theme.colors.background.card};
  box-shadow: ${(props) => props.theme.shadow.sm};
  text-align: center;
  white-space: nowrap;
  border-radius: 8px;
  padding: 4px 8px;
  height: 24px;

  position: absolute;
  z-index: 100;

  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);

  font-size: 12px;
  line-height: 1.2;
  font-weight: normal;
`;

const Tooltip: FunctionComponent<TooltipProps> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const portalElement = document.getElementById("tooltip-portal");

  useEffect(() => {
    if (visible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      tooltipRef.current.style.left = `${triggerRect.right}px`;
      tooltipRef.current.style.top = `${
        triggerRect.top +
        window.scrollY -
        triggerRef.current.offsetHeight / 2 -
        tooltipRef.current.offsetHeight / 2 -
        4
      }px`;
    }
  }, [visible]);

  return (
    <TooltipContainer
      ref={triggerRef}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && portalElement
        ? createPortal(
            <TooltipSpan ref={tooltipRef} style={{ position: "absolute" }}>
              {text}
            </TooltipSpan>,
            portalElement,
          )
        : null}
    </TooltipContainer>
  );
};

export default Tooltip;
