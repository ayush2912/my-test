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

  justify-content: center;
  background-color: ${(props) => props.theme.colors.primary[600]};

  &:active {
    box-shadow: 0px 0px 0px 4px #b1c8f9;
  }
`;

export const EngagementBar = ({ engagementData }: { engagementData: any }) => {
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
  console.log(
    "hello",
    engagementData.bar.barWidth,
    "hi",
    engagementData.bar.offsetFromLeft,
  );
  return (
    <Container>
      <Bar
        ref={popupRef}
        barWidth={engagementData.bar.barWidth}
        offsetFromLeft={engagementData.bar.offsetFromLeft}
        onMouseDown={handleContainerMouseDown}
      >
        {showPopup && (
          <BarPopup top={popupPosition.top} left={popupPosition.left}>
            This is the popup content.
          </BarPopup>
        )}
        <Text type="caption" color="white">
          engagement
        </Text>
      </Bar>
    </Container>
  );
};
