import styled from "styled-components";

import Icon, { IconNameType } from "@/components/Icon";
import Text from "@/components/Text";
import Tooltip from "@/components/Tooltip";
import { convertToEuropeanDateFormat } from "@/utils/dateTimeFormatter";

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
  name: string;
  startDate: Date;
  dueDate: Date;
  status: "IN_PROGRESS" | "COMPLETED" | "NOT_STARTED" | "DISCONTINUED";
};

export default function TaskList({
  name,
  startDate,
  dueDate,
  status,
}: TaskListProps) {
  const selectedIconName = {
    IN_PROGRESS: "inProgress",
    COMPLETED: "success",
    NOT_STARTED: "notStarted",
    DISCONTINUED: "discontinued",
  }[status] as IconNameType;

  const tooltipTextContent = {
    IN_PROGRESS: "IN PROGRESS",
    COMPLETED: "Completed on xxx",
    NOT_STARTED: "NOT STARTED",
    DISCONTINUED: "discontinued",
  }[status] as string;

  return (
    <StyledTaskContainer>
      <Tooltip text={tooltipTextContent}>
        <Icon name={selectedIconName} />
      </Tooltip>

      <ColumnWrapper>
        <TextWithMarginBottom type="body">{name}</TextWithMarginBottom>
        <Text type="body" color="subdued">
          {`${convertToEuropeanDateFormat(
            startDate,
          )} - ${convertToEuropeanDateFormat(dueDate)}`}
        </Text>
      </ColumnWrapper>
    </StyledTaskContainer>
  );
}
