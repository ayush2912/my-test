import moment from "moment";
import { memo, useMemo, useState } from "react";
import styled from "styled-components";

import {
  getBarInfo,
  memoizeProjectEngagementData,
  getCalendarInfo,
} from "@/utils/calendarHelper";

import { CalendarHeader } from "./CalendarHeader";
import { EngagementBar } from "./EngagementBar";
import { ProjectEngagement } from "./GanttChart.types";
import { ProjectBar } from "./ProjectBar";
import { TaskBar } from "./TaskBar";
import Card from "../Card";
import Dropdown from "../Dropdown";

const CalendarBackground = styled.div<{
  width: number;
  view: "yearly" | "monthly" | "weekly";
}>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width}px;
  height: 600px;
  border: 1px solid #f1f2f4;
  background-color: #ffffff;
  background-image: linear-gradient(
      to right,
      rgba(225, 228, 232, 0.5) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, transparent 40px, rgba(241, 242, 244, 0.5) 1px);

  background-size: ${({ view }) =>
      ({ weekly: 155, monthly: 40, yearly: 124 }[view])}px
    80px;
`;

const StyledCalendarContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding-top: 24px;
  border-top: 1px solid #e1e4e8;
  overflow-x: scroll;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 24px;
`;

export const GanttChart = ({
  mappedProjectEngagements,
  projectEngagementData,
  selectedView,
}: {
  mappedProjectEngagements?: any;
  projectEngagementData: ProjectEngagement[];
  selectedView?: string;
}) => {
  const [selectedOption, setSelectedOption] = useState<
    "yearly" | "monthly" | "weekly"
  >(selectedView || "monthly");

  const options = [
    { value: "monthly", label: "monthly" },
    { value: "yearly", label: "yearly" },
    { value: "weekly", label: "weekly" },
  ];

  const handleDropdownChange = (value: "yearly" | "monthly" | "weekly") => {
    setSelectedOption(value);
  };

  const calendar = useMemo(() => {
    const { earliestStartDate, latestEndDate, info } =
      memoizeProjectEngagementData(projectEngagementData);

    return {
      earliestStartDate,
      latestEndDate,
      info,
    };
  }, [projectEngagementData]);

  return (
    <Card width={1280}>
      <ButtonContainer>
        <Dropdown
          options={options}
          value={selectedOption}
          onChange={handleDropdownChange}
        />
      </ButtonContainer>
      <StyledCalendarContainer>
        <CalendarHeader calendarInfo={calendar.info} view={selectedOption} />
        <CalendarBackground
          width={calendar.info.calendarWidth[selectedOption]}
          view={selectedOption}
        >
          {mappedProjectEngagements.map((v: any) => {
            return (
              <>
                <ProjectBar key={v.id} projectData={v.project} />
                <EngagementBar key={v.id} engagementData={v} />
                {v.tasks.map((v: any) => (
                  <TaskBar key={v.id} taskData={v} />
                ))}
              </>
            );
          })}
        </CalendarBackground>
      </StyledCalendarContainer>
    </Card>
  );
};
