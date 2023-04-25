import styled from "styled-components";

import Icon from "@/components/Icon";
import Text from "@/components/Text";

export default function TaskList({
  name,
  startDate,
  dueDate,
  status,
}: {
  name: string;
  startDate: string;
  dueDate: string;
  status: "IN_PROGRESS" | "COMPLETED" | "NOT_STARTED";
}) {
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

  return (
    <StyledTaskContainer>
      <Icon name="notStarted" />
      <ColumnWrapper>
        <TextWithMarginBottom type="body">{name}</TextWithMarginBottom>
        <Text type="body" color="subdued">
          {`${startDate} - ${dueDate}`}
        </Text>
      </ColumnWrapper>
    </StyledTaskContainer>
  );
}
