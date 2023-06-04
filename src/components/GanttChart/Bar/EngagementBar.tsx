import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { BarPopup } from "./BarPopup";
import { useOutsideAlerter } from "../../../hooks/useOutsideAlerter";
import { convertToMonthNameFormat } from "../../../utils/dateTimeFormatter";
import Button from "../../Button";
import Icon from "../../Icon";
import StatusTag, { StatusType } from "../../StatusTag";
import Text from "../../Text";
import { IMappedEngagement } from "../GanttChart.types";
import useGanttChartControls from "../useGanttChartControls";

export const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  white-space: normal;
  align-items: center;
`;
export const ModalContent = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const TextHolder = styled.div`
  display: flex;
  align-items: start;
  gap: 4px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 8px 0px;
  user-select: none;
`;

const Bar = styled.div<{
  width: number;
  offsetFromLeft: number;
  focus: boolean;
}>`
  display: flex;
  align-items: center;
  height: 24px;
  width: ${({ width }) => width}px;
  min-width: 24px;
  border-radius: 4px;
  margin-left: ${({ offsetFromLeft }) => offsetFromLeft}px;
  margin-right: 8px;
  cursor: pointer;
  padding: 4px 8px;
  background-color: ${(props) => props.theme.colors.neutral[600]};
  z-index: 2;
  &:hover {
    box-shadow: 0px 0px 0px 4px #c4c9d1;
  }

  &:active {
    box-shadow: 0px 0px 0px 4px #c4c9d1;
  }

  ${({ focus }) => (focus ? "box-shadow: 0px 0px 0px 4px #C4C9D1" : "")}
`;

type EngagmentStateTypes =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "DISCONTINUED"
  | "COMPLETED"
  | "OVERDUE";
interface EngagementStatus {
  label: EngagmentStateTypes;
  type: StatusType;
}

export const EngagementBar = ({
  engagementData,
}: {
  engagementData: IMappedEngagement;
}) => {
  const { view, scrollEvent } = useGanttChartControls();

  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const barRef = useRef(null);
  const contentRef = useRef(null);
  const popupRef = useRef(null);
  useOutsideAlerter(barRef, () => {
    if (showPopup) setShowPopup(false);
  });

  useEffect(() => {
    if (barRef.current && contentRef.current) {
      const containerWidth = (barRef.current as HTMLElement).clientWidth;
      const contentWidth = (contentRef.current as HTMLElement).scrollWidth;

      setIsTextOverflowing(contentWidth + 16 > containerWidth);
    }
  }, [view]);

  const handleContainerMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    setShowPopup(true);
    const windowHeight = window.innerHeight;
    const clientY = event.clientY;
    const windowWidth = window.innerWidth;
    const clientX = event.clientX;

    const newPositionLeft =
      clientX + 300 > windowWidth ? Math.max(clientX - 300, 0) : clientX;
    const newPositionTop =
      clientY + 180 > windowHeight ? Math.max(clientY - 180, 0) : clientY;

    setPopupPosition({ top: newPositionTop, left: newPositionLeft });
  };

  const handlePopupMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  const statusTag = {
    NOT_STARTED: { label: "NOT STARTED", type: "disabled" },
    IN_PROGRESS: { label: "IN PROGRESS", type: "information" },
    DISCONTINUED: { label: "DISCONTINUED", type: "error" },
    COMPLETED: { label: "COMPLETED", type: "success" },
    OVERDUE: { label: "OVERDUE", type: "warning" },
  }[engagementData.state] as EngagementStatus;

  useEffect(() => {
    setShowPopup(false);
  }, [scrollEvent]);

  return (
    <>
      {showPopup && (
        <BarPopup
          ref={popupRef}
          onMouseDown={handlePopupMouseDown}
          top={popupPosition.top}
          left={popupPosition.left}
        >
          <ModalHeader>
            <Text type="captionBold" color="default">
              {engagementData.type}
            </Text>
            <Button
              type="secondary"
              isIcon
              onClick={() => {
                engagementData.onViewClick(engagementData.projectId);
              }}
            >
              <Icon name="eyeIcon" size="xsmall" />
            </Button>
          </ModalHeader>
          <div style={{ margin: "5px 0px" }}>
            <StatusTag
              name={statusTag.label}
              type={engagementData.isOverdue ? "warning" : statusTag.type}
            />
          </div>
          <ModalContent>
            <TextHolder>
              <Text type="caption" color="subdued">
                Start date :
              </Text>
              <Text type="caption" color="default">
                {convertToMonthNameFormat(engagementData.startDate)}
              </Text>
            </TextHolder>

            <TextHolder>
              <Text type="caption" color="subdued">
                Due date :
              </Text>
              <Text type="caption" color="default">
                {convertToMonthNameFormat(engagementData.dueDate)}
              </Text>
            </TextHolder>
            {engagementData.completedDate && (
              <TextHolder>
                <Text type="caption" color="subdued">
                  Completion date :
                </Text>
                <Text type="caption" color="default">
                  {convertToMonthNameFormat(engagementData.completedDate)}
                </Text>
              </TextHolder>
            )}
          </ModalContent>
        </BarPopup>
      )}
      <Container>
        <Bar
          ref={barRef}
          width={engagementData.bar.width[view]}
          offsetFromLeft={engagementData.bar.offsetFromLeft[view]}
          onMouseDown={handleContainerMouseDown}
          focus={showPopup}
        >
          {!isTextOverflowing && (
            <Text ref={contentRef} type="captionBold" color="white">
              {engagementData.type}
            </Text>
          )}
        </Bar>
        {isTextOverflowing && (
          <Text type="caption" color="default">
            {engagementData.type}
          </Text>
        )}
      </Container>
    </>
  );
};
