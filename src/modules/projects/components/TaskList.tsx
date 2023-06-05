import moment from "moment";
import { useMemo } from "react";
import styled from "styled-components";

import Icon, { IconNameType } from "../../../components/Icon";
import Text from "../../../components/Text";
import Tooltip from "../../../components/Tooltip";
import { dateDifference } from "../../../utils/dateDifference";
import {
  convertToMonthNameFormat,
  calculateFromToday,
} from "../../../utils/dateTimeFormatter";
import { ETaskState } from "../constants/taskState";

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

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TextWithMarginBottom = styled(Text)`
  margin-bottom: 4px;
`;

const DotDivider = styled.div`
  width: 4px;
  height: 4px;
  background-color: #c4c9d1;
  border-radius: 50%;
  margin: 0 4px;
`;

export type TaskListProps = {
  type: string;
  startDate: Date;
  dueDate: Date;
  completedDate?: Date;
  isOverdue: boolean;
  state: "IN_PROGRESS" | "COMPLETED" | "NOT_STARTED" | "DISCONTINUED";
  assignee: string;
};

export default function TaskList({
  type,
  startDate,
  dueDate,
  state,
  completedDate,
  isOverdue,
  assignee,
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
      completedDate && convertToMonthNameFormat(completedDate)
    }`,
    NOT_STARTED: "NOT STARTED",
    DISCONTINUED: "DISCONTINUED",
  }[state] as string;

  const alarmClockTooltipContent = {
    text: "",
  };

  const overdueTooltipText = useMemo(() => {
    const today = new Date();

    if (state === "NOT_STARTED" && moment(today).isAfter(moment(startDate)))
      return "DELAYED BY " + dateDifference(startDate, new Date()).join(" ");

    if (
      state === ETaskState.IN_PROGRESS &&
      moment(today).isAfter(moment(dueDate))
    )
      return "DELAYED BY " + dateDifference(dueDate, new Date()).join(" ");

    if (state === "COMPLETED" && moment(completedDate).isAfter(moment(dueDate)))
      return "DELAYED BY " + dateDifference(dueDate, completedDate).join(" ");

    return "";
  }, [state, startDate, dueDate, completedDate]);
  // const displayAlarmClockIcon = () => {
  //   if (
  //     state === "NOT_STARTED" &&
  //     calculateFromToday(new Date(), startDate) === "Today > inputDate"
  //   ) {
  //     alarmClockTooltipContent["text"] =
  //       "DELAYED BY " + dateDifference(startDate, new Date()).join(" ");
  //   } else if (
  //     state === "IN_PROGRESS" &&
  //     calculateFromToday(new Date(), dueDate) === "Today > inputDate"
  //   ) {
  //     alarmClockTooltipContent["text"] =
  //       "DELAYED BY " + dateDifference(dueDate, new Date()).join(" ");
  //   } else if (
  //     state === "COMPLETED" &&
  //     calculateFromToday(completedDate, dueDate) === "Today > inputDate"
  //   ) {
  //     alarmClockTooltipContent["text"] =
  //       "DELAYED BY " + dateDifference(dueDate, completedDate).join(" ");
  //   }
  // };

  return (
    <StyledTaskContainer>
      <Tooltip text={tooltipTextContent}>
        <Icon name={selectedIconName} />
      </Tooltip>

      <ColumnWrapper>
        <FlexContainer>
          <TextWithMarginBottom
            type="body"
            color={state === "DISCONTINUED" ? "disabled" : "default"}
          >
            {type}
          </TextWithMarginBottom>
          {isOverdue && (
            <Tooltip text={overdueTooltipText}>
              <Icon name="alarmClock" size="xsmall" />
            </Tooltip>
          )}
        </FlexContainer>

        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <Text
            type="body"
            color={state === "DISCONTINUED" ? "disabled" : "subdued"}
          >
            {convertToMonthNameFormat(startDate)} -{" "}
          </Text>

          <Text
            type="body"
            color={state === "DISCONTINUED" ? "disabled" : "subdued"}
          >
            {convertToMonthNameFormat(dueDate)}
          </Text>

          <DotDivider />

          <Text
            type="body"
            color={state === "DISCONTINUED" ? "disabled" : "subdued"}
          >
            {assignee}
          </Text>
        </div>
      </ColumnWrapper>
    </StyledTaskContainer>
  );
}
