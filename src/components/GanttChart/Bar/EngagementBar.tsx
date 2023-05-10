import { useRef, useState } from "react";
import styled from "styled-components";

import EyeButton from "@/components/EyeButton";
import { useOutsideAlerter } from "@/hooks/useOutsiderAlerter";
import { convertToEuropeanDateFormat } from "@/utils/dateTimeFormatter";

import { BarPopup } from "./BarPopup";
import { ModalContent, ModalHeader, TextHolder } from "./ProjectBar";
import StatusTag, { StatusType } from "../../StatusTag";
import Text from "../../Text";
import { IMappedEngagement } from "../GanttChart.types";
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
  cursor: pointer;
  padding: 4px 8px;
  background-color: ${(props) => props.theme.colors.primary[600]};

  &:active {
    box-shadow: 0px 0px 0px 4px #b1c8f9;
  }

  ${({ focus }) => (focus ? "box-shadow: 0px 0px 0px 4px #b1c8f9;" : "")}
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
  const { view } = useGanttChartControls();

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
  const statusTag = {
    NOT_STARTED: { label: "NOT STARTED", type: "disabled" },
    IN_PROGRESS: { label: "IN PROGRESS", type: "information" },
    DISCONTINUED: { label: "DISCONTINUED", type: "error" },
    COMPLETED: { label: "COMPLETED", type: "success" },
    OVERDUE: { label: "OVERDUE", type: "warning" },
  }[engagementData.state] as EngagementStatus;

  return (
    <Container>
      <Bar
        ref={popupRef}
        width={engagementData.bar.width[view]}
        offsetFromLeft={engagementData.bar.offsetFromLeft[view]}
        onMouseDown={handleContainerMouseDown}
        focus={showPopup}
      >
        {showPopup && (
          <BarPopup top={popupPosition.top} left={popupPosition.left}>
            <ModalHeader>
              <Text type="captionBold" color="default">
                {engagementData.type}
              </Text>
              <EyeButton
                onClick={() => {
                  console.log("clicked");
                }}
              />
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
                  {convertToEuropeanDateFormat(engagementData.startDate)}
                </Text>
              </TextHolder>

              <TextHolder>
                <Text type="caption" color="subdued">
                  Due date :
                </Text>
                <Text type="caption" color="default">
                  {convertToEuropeanDateFormat(engagementData.dueDate)}
                </Text>
              </TextHolder>
              <TextHolder>
                <Text type="caption" color="subdued">
                  Completion date : :
                </Text>
                <Text type="caption" color="default">
                  {engagementData.completedDate
                    ? convertToEuropeanDateFormat(engagementData.completedDate)
                    : null}
                </Text>
              </TextHolder>
            </ModalContent>
          </BarPopup>
        )}
        <Text type="caption" color="white">
          {engagementData.type}
        </Text>
      </Bar>
    </Container>
  );
};
