import { useRef, useState } from "react";
import styled from "styled-components";

import { useOutsideAlerter } from "@/hooks/useOutsiderAlerter";

import { BarPopup } from "./BarPopup";
import Text from "../Text";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 8px 0px;
  user-select: none;
`;

const Bar = styled.div<{ barWidth: number; offsetFromLeft: number }>`
  display: flex;
  align-items: center;
  height: 24px;
  width: ${({ barWidth }) => barWidth}px;
  border-radius: 4px;
  margin-left: ${({ offsetFromLeft }) => offsetFromLeft}px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const ProjectBar = ({
  barWidth,
  offsetFromLeft,
}: {
  barWidth: number;
  offsetFromLeft: number;
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const popupRef = useRef(null);
  useOutsideAlerter(popupRef, () => setShowPopup(false));

  const handleContainerMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    setShowPopup(true);
    setPopupPosition({ top: event.clientY, left: event.clientX });
  };

  return (
    <Container>
      <Bar
        ref={popupRef}
        barWidth={barWidth}
        offsetFromLeft={offsetFromLeft}
        onMouseDown={handleContainerMouseDown}
      >
        {showPopup && (
          <BarPopup top={popupPosition.top} left={popupPosition.left}>
            This is the popup content.
          </BarPopup>
        )}
        <Text type="bodyBold" color="default">
          150 MW Solar Project in Karnataka by Avaada Solar
        </Text>
      </Bar>
    </Container>
  );
};
