import { FunctionComponent, ReactNode, useState } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";

import Text from "./Text";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const TooltipContent = styled.div`
  background-color: ${(props) => props.theme.colors.background.card};
  box-shadow: ${(props) => props.theme.shadow.sm};

  text-align: center;
  white-space: nowrap;

  border-radius: 8px;
  padding: 4px 8px;
  height: 24px;
`;

const Tooltip: FunctionComponent<TooltipProps> = ({ text, children }) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const [showTooltip, setShowTooltip] = useState(false);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top-end",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 4],
        },
      },
    ],
  });

  return (
    <>
      <div
        ref={setReferenceElement}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => {
          setShowTooltip(false);
        }}
      >
        {children}
      </div>

      {showTooltip && (
        <TooltipContent
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <Text type="smallTextBold">{text}</Text>
        </TooltipContent>
      )}
    </>
  );
};

export default Tooltip;
