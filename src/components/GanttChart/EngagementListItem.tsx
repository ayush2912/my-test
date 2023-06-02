import styled from "styled-components";

import Button from "../Button";
import Icon from "../Icon";
import StatusTag, { StatusType } from "../StatusTag";
import Text from "../Text";

const StyledEngagementListItem = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 12px 28px 12px 16px;
  justify-content: space-between;

  div {
    gap: 8px;
    display: flex;
    align-items: center;
    justify-content: left;
  }
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

export const EngagementListItem = ({
  type,
  state,
  onClick,
}: {
  type: string;
  state: string;
  onClick: () => void;
}) => {
  const statusTag = {
    IN_PROGRESS: { label: "IN PROGRESS", type: "information" },
    NOT_STARTED: { label: "NOT STARTED", type: "disabled" },
    DISCONTINUED: { label: "DISCONTINUED", type: "error" },
    COMPLETED: { label: "COMPLETED", type: "success" },
    OVERDUE: { label: "OVERDUE", type: "warning" },
  }[state] as EngagementStatus;

  return (
    <StyledEngagementListItem>
      <div>
        <Text color="default" type="bodyBold">
          {type}
        </Text>
        <StatusTag name={statusTag.label} type={statusTag.type} />
      </div>
      <div>
        <Button isIcon onClick={onClick} type="secondary">
          <Icon name="eyeIcon" size="xsmall" />
        </Button>
      </div>
    </StyledEngagementListItem>
  );
};
