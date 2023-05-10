import { useRef, useState } from "react";
import styled from "styled-components";

import { useOutsideAlerter } from "@/hooks/useOutsiderAlerter";

import { BarPopup } from "./BarPopup";
import Text from "../../Text";
import { IBar } from "../GanttChart.types";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 8px 0px;
  user-select: none;
`;

const Bar = styled.div<IBar>`
  display: flex;
  align-items: center;
  height: 24px;
  width: ${({ width }) => width}px;
  border-radius: 4px;
  margin-left: ${({ offsetFromLeft }) => offsetFromLeft}px;
  cursor: pointer;

  justify-content: center;
  border: 2px solid #8aadf7;
  background-color: #8aadf7;
  overflow: hidden;

  &:active {
    box-shadow: 0px 0px 0px 4px #b1c8f9;
  }
`;

export const TaskBar = ({ taskData }: { taskData: any }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const popupRef = useRef(null);
  useOutsideAlerter(popupRef, () => {
    if (showPopup) setShowPopup(false);
  });

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
        width={taskData.bar.width}
        offsetFromLeft={taskData.bar.offsetFromLeft}
        onMouseDown={handleContainerMouseDown}
      >
        {showPopup && (
          <BarPopup top={popupPosition.top} left={popupPosition.left}>
            This is the popup content.
          </BarPopup>
        )}
        <Text type="caption" color="default">
          Task 1
        </Text>
      </Bar>
    </Container>
  );
};
