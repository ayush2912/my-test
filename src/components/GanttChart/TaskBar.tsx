import { useRef, useState } from "react";
import styled from "styled-components";

import { useOutsideAlerter } from "@/hooks/useOutsiderAlerter";
import { convertToEuropeanDateFormat } from "@/utils/dateTimeFormatter";

import { BarPopup } from "./BarPopup";
import { ModalContent, ModalHeader, TextHolder } from "./ProjectBar";
import StatusTag, { StatusType } from "../StatusTag";
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
  border: 2px solid #8aadf7;
  background-color: #8aadf7;
  overflow: hidden;

  &:active {
    box-shadow: 0px 0px 0px 4px #b1c8f9;
  }
`;

interface TaskData {
  isOverdue: boolean;
  type: string;
  startDate: string;
  dueDate: string;
  completedDate: string;
  bar: { offsetFromLeft: number; barWidth: number };
}

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

export const TaskBar = ({ taskData }: { taskData: TaskData }) => {
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
  useOutsideAlerter(popupRef, () => {
    if (showPopup) setShowPopup(false);
  });

  const handleContainerMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    setShowPopup(true);
    setPopupPosition({ top: event.clientY, left: event.clientX });
  };
  console.log(taskData);
  return (
    <Container>
      <Bar
        ref={popupRef}
        barWidth={taskData.bar.barWidth}
        offsetFromLeft={taskData.bar.offsetFromLeft}
        onMouseDown={handleContainerMouseDown}
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
        <Text type="caption" color="default">
          Task 1
        </Text>
      </Bar>
    </Container>
  );
};
