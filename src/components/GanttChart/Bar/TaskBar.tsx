import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { BarPopup } from "./BarPopup";
import { ModalContent, ModalHeader, TextHolder } from "./ProjectBar";
import { useOutsideAlerter } from "../../../hooks/useOutsiderAlerter";
import { convertToEuropeanDateFormat } from "../../../utils/dateTimeFormatter";
import StatusTag, { StatusType } from "../../StatusTag";
import Text from "../../Text";
import { IBar, Task } from "../GanttChart.types";
import useGanttChartControls from "../useGanttChartControls";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
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
  border-radius: 4px;
  margin-left: ${({ offsetFromLeft }) => offsetFromLeft}px;
  margin-right: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border: 2px solid #8aadf7;
  background-color: #8aadf7;
  overflow: hidden;
  white-space: nowrap;
  &:active {
    box-shadow: 0px 0px 0px 4px #b1c8f9;
  }

  ${({ focus }) => (focus ? "box-shadow: 0px 0px 0px 4px #b1c8f9;" : "")}
`;

type TaskStateTypes =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "DISCONTINUED"
  | "COMPLETED"
  | "OVERDUE";
interface TaskStatus {
  label: TaskStateTypes;
  type: StatusType;
}

export const TaskBar = ({ taskData }: { taskData: Task & { bar: IBar } }) => {
  const { view } = useGanttChartControls();
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const statusTag = {
    NOT_STARTED: { label: "NOT STARTED", type: "disabled" },
    IN_PROGRESS: { label: "IN PROGRESS", type: "information" },
    DISCONTINUED: { label: "DISCONTINUED", type: "error" },
    COMPLETED: { label: "COMPLETED", type: "success" },
    OVERDUE: { label: "OVERDUE", type: "warning" },
  }[taskData.state] as TaskStatus;

  const popupRef = useRef(null);
  const contentRef = useRef(null);

  useOutsideAlerter(popupRef, () => {
    if (showPopup) setShowPopup(false);
  });

  useEffect(() => {
    if (popupRef.current && contentRef.current) {
      const containerWidth = (popupRef.current as HTMLElement).clientWidth;
      const contentWidth = (contentRef.current as HTMLElement).scrollWidth;

      setIsTextOverflowing(contentWidth + 16 > containerWidth);
    }
  }, [view]);

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
        width={taskData.bar.width[view]}
        offsetFromLeft={taskData.bar.offsetFromLeft[view]}
        onMouseDown={handleContainerMouseDown}
        focus={showPopup}
      >
        {showPopup && (
          <BarPopup top={popupPosition.top} left={popupPosition.left}>
            <ModalHeader>
              <Text type="captionBold" color="default">
                {taskData.type}
              </Text>
            </ModalHeader>
            <div style={{ margin: "5px 0px" }}>
              <StatusTag
                name={statusTag.label}
                type={taskData.isOverdue ? "warning" : statusTag.type}
              />
            </div>

            <ModalContent>
              <TextHolder>
                <Text type="caption" color="subdued">
                  Start date :
                </Text>
                <Text type="caption" color="default">
                  {convertToEuropeanDateFormat(taskData.startDate)}
                </Text>
              </TextHolder>

              <TextHolder>
                <Text type="caption" color="subdued">
                  Due date :
                </Text>
                <Text type="caption" color="default">
                  {convertToEuropeanDateFormat(taskData.dueDate)}
                </Text>
              </TextHolder>
              <TextHolder>
                <Text type="caption" color="subdued">
                  Completion date : :
                </Text>
                <Text type="caption" color="default">
                  {convertToEuropeanDateFormat(taskData.completedDate)}
                </Text>
              </TextHolder>
            </ModalContent>
          </BarPopup>
        )}
        {!isTextOverflowing && (
          <Text ref={contentRef} type="caption" color="default">
            {taskData.type}
          </Text>
        )}
      </Bar>
      {isTextOverflowing && (
        <Text type="caption" color="default">
          {taskData.type}
        </Text>
      )}
    </Container>
  );
};
