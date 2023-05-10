import styled from "styled-components";

import Icon, { IconNameType } from "../../../components/Icon";
import Text from "../../../components/Text";
import Tooltip from "../../../components/Tooltip";
import { convertToEuropeanDateFormat } from "../../../utils/dateTimeFormatter";

const StyledTaskContainer = styled.div`
  border-top: 1px solid #e1e4e8;
  border-left: 1px solid #e1e4e8;
  border-right: 1px solid #e1e4e8;
  padding: 16px;
  display: flex;
  align-items: center;

  &:first-child {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  &:last-child {
    border-bottom: 1px solid #e1e4e8;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;

const TextWithMarginBottom = styled(Text)`
  margin-bottom: 4px;
`;

export type TaskListProps = {
  type: string;
  startDate: Date;
  dueDate: Date;
  completedDate?: Date;
  isOverdue: boolean;
  state: "IN_PROGRESS" | "COMPLETED" | "NOT_STARTED" | "DISCONTINUED";
};

export default function TaskList({
  type,
  startDate,
  dueDate,
  state,
  completedDate,
  isOverdue,
}: TaskListProps) {
  const selectedIconName = {
    IN_PROGRESS: "inProgress",
    COMPLETED: "success",
    NOT_STARTED: "notStarted",
    DISCONTINUED: "discontinued",
  }[state] as IconNameType;

  const tooltipTextContent = {
    IN_PROGRESS: "IN PROGRESS",
    COMPLETED: `COMPLETED ON ${
      completedDate && convertToEuropeanDateFormat(completedDate)
    }`,
    NOT_STARTED: "NOT STARTED",
    DISCONTINUED: "DISCONTINUED",
  }[state] as string;

  return (
    <StyledTaskContainer>
      <Tooltip text={tooltipTextContent}>
        <Icon
          name={selectedIconName}
          color={isOverdue && state !== "DISCONTINUED" ? "#E0A008" : ""}
        />
      </Tooltip>

      <ColumnWrapper>
        <TextWithMarginBottom
          type="body"
          color={state === "DISCONTINUED" ? "disabled" : "default"}
        >
          {type}
        </TextWithMarginBottom>

        <div style={{ display: "flex", gap: "4px" }}>
          <Text
            type="body"
            color={state === "DISCONTINUED" ? "disabled" : "subdued"}
          >
            {convertToEuropeanDateFormat(startDate)} -{" "}
          </Text>

          <Text
            type="body"
            color={
              isOverdue && state !== "DISCONTINUED"
                ? "warning"
                : state === "DISCONTINUED"
                ? "disabled"
                : "subdued"
            }
          >
            {convertToEuropeanDateFormat(dueDate)}
          </Text>
        </div>
      </ColumnWrapper>
    </StyledTaskContainer>
  );
}