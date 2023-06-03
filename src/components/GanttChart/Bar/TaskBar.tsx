import moment from "moment";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { BarPopup } from "./BarPopup";
import { useOutsideAlerter } from "../../../hooks/useOutsiderAlerter";
import { convertToMonthNameFormat } from "../../../utils/dateTimeFormatter";
import Icon from "../../Icon";
import StatusTag, { StatusType } from "../../StatusTag";
import Text from "../../Text";
import { IBar, ITask } from "../GanttChart.types";
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
  div {
    display: flex;
    align-items: center;
  }
`;

const Bar = styled.div<{
  width: number;
  offsetFromLeft: number;
  focus: boolean;
  statusInfo: TaskStatus;
}>`
  display: flex;
  align-items: center;
  height: 24px;
  width: ${({ width }) => width}px;
  min-width: 24px;
  border-radius: 4px;
  margin-left: ${({ offsetFromLeft }) => offsetFromLeft}px;
  z-index: 2;
  cursor: pointer;
  padding: ${({ width }) => (width < 40 ? "0px 4px" : "4px 8px")};
  background-color: ${(props) =>
    props.theme.colors.semantic[props.statusInfo.type].default};
  gap: 12px;
  overflow: hidden;
  white-space: nowrap;

  &:active {
    box-shadow: ${(props) => `0px 0px 0px 4px ${props.statusInfo.borderColor}`};
  }
  &:hover {
    box-shadow: ${(props) => `0px 0px 0px 4px ${props.statusInfo.borderColor}`};
  }

  ${({ focus, statusInfo }) =>
    focus ? `box-shadow: 0px 0px 0px 4px ${statusInfo.borderColor}` : ""}
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
  borderColor?: string;
}

export const TaskBar = ({
  taskData,
  isOverDue,
}: {
  taskData: ITask & { bar: IBar };
  isOverDue: boolean;
}) => {
  const { view, scrollEvent } = useGanttChartControls();
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const statusTag = {
    NOT_STARTED: {
      borderColor: "#E7E8EA",
      label: "NOT STARTED",
      type: "disabled",
    },
    IN_PROGRESS: {
      borderColor: "#B7DDF9",
      label: "IN PROGRESS",
      type: "information",
    },
    DISCONTINUED: { label: "DISCONTINUED", type: "error" },
    COMPLETED: { borderColor: "#BDE2D7", label: "COMPLETED", type: "success" },
    OVERDUE: { label: "OVERDUE", type: "warning" },
  }[taskData.state] as TaskStatus;

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
              {taskData.type}
            </Text>
          </ModalHeader>
          <div style={{ margin: "5px 0px" }}>
            <StatusTag name={statusTag.label} type={statusTag.type} />
          </div>

          <ModalContent>
            <TextHolder>
              <Text type="caption" color="subdued">
                Start date :
              </Text>
              <TextHolder>
                <Text type="caption" color="default">
                  {convertToMonthNameFormat(taskData.startDate)}
                </Text>
                {taskData.state === "NOT_STARTED" && (
                  <>
                    <Icon name="watch" size="xsmall" />
                    <Text type="smallText" color="subdued">
                      ({moment(taskData.startDate).fromNow()})
                    </Text>
                  </>
                )}
              </TextHolder>
            </TextHolder>

            <TextHolder>
              <Text type="caption" color="subdued">
                Due date :
              </Text>
              <TextHolder>
                <Text type="caption" color="default">
                  {convertToMonthNameFormat(taskData.dueDate)}
                </Text>
                {taskData.state === "IN_PROGRESS" &&
                  moment() > moment(taskData.dueDate) && (
                    <>
                      <Icon name="watch" size="xsmall" />
                      <Text type="smallText" color="subdued">
                        ({moment(taskData.dueDate).fromNow()})
                      </Text>
                    </>
                  )}
              </TextHolder>
            </TextHolder>
            {taskData.completedDate && (
              <TextHolder>
                <Text type="caption" color="subdued">
                  Completion date :
                </Text>

                <TextHolder>
                  <Text type="caption" color="default">
                    {convertToMonthNameFormat(taskData.completedDate)}
                  </Text>

                  {taskData.state === "COMPLETED" &&
                    moment(taskData.completedDate) >
                      moment(taskData.dueDate) && (
                      <>
                        <Icon name="watch" size="xsmall" />
                        <Text type="smallText" color="subdued">
                          (
                          {moment(taskData.dueDate).from(
                            taskData.completedDate,
                          )}
                          )
                        </Text>
                      </>
                    )}
                </TextHolder>
              </TextHolder>
            )}
          </ModalContent>
        </BarPopup>
      )}
      <Container>
        <Bar
          ref={barRef}
          width={taskData.bar.width[view]}
          offsetFromLeft={taskData.bar.offsetFromLeft[view]}
          onMouseDown={handleContainerMouseDown}
          focus={showPopup}
          statusInfo={statusTag}
        >
          {isOverDue && (
            <Icon
              size="xsmall"
              strokeColor={
                taskData.state === "NOT_STARTED" ? "#363C46" : "white"
              }
              name="watch"
            />
          )}
          {!isTextOverflowing && (
            <Text
              ref={contentRef}
              type="caption"
              color={taskData.state === "NOT_STARTED" ? "default" : "white"}
            >
              {taskData.type}
            </Text>
          )}
        </Bar>
        {isTextOverflowing && (
          <div style={{ paddingLeft: "3px" }}>
            <Text type="caption" color="default">
              {taskData.type}
            </Text>
          </div>
        )}
      </Container>
    </>
  );
};
