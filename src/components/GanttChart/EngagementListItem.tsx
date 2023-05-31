import styled from "styled-components";

import Button from "../Button";
import Icon from "../Icon";
import StatusTag, { StatusType } from "../StatusTag";
import Text from "../Text";

const StyledEngagementListItem = styled.div`
  width: 385px;
  height: 64px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 12px 28px 12px 16px;
  justify-content: space-between;
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
    NOT_STARTED: { label: "NOT STARTED", type: "disabled" },
    IN_PROGRESS: { label: "IN PROGRESS", type: "information" },
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
        <Button onClick={onClick} border="1px solid #E1E4E8">
          <Icon name="eyeIcon" />
        </Button>
      </div>
    </StyledEngagementListItem>
  );
};
