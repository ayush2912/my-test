import styled from "styled-components";

import { ITask } from "./GanttChart.types";
import Icon from "../Icon";
import Text from "../Text";
import Tooltip from "../Tooltip";

const StyledTaskListItem = styled.div`
  width: 385px;
  height: 48px;
  display: flex;
  align-items: center;
  padding: 12px 28px 12px 16px;
  justify-content: space-between;

  div {
    gap: 14px;
    display: flex;
    align-items: center;

    span {
      max-width: 240px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  &:nth-child(even) {
    background-color: #f1f2f4; /* Stripe color for even list items */
  }

  &:nth-child(odd) {
    background-color: #ffffff; /* Stripe color for odd list items */
  }
`;

export const TaskListItem = ({ data }: { data: ITask }) => {
  return (
    <StyledTaskListItem>
      <div>
        {data.isOverdue && (
          <Tooltip text={`DELAYED BY ${1} DAYS`}>
            <Icon name="watch" />
          </Tooltip>
        )}
        <Text color="default" type="body">
          {data.type}
        </Text>
      </div>

      <div>
        <Text color="subdued" type="caption">
          {data.assignee}
        </Text>
      </div>
    </StyledTaskListItem>
  );
};

export default TaskListItem;
