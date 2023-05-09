import moment from "moment";
import { useState } from "react";
import styled from "styled-components";

import { getBarInfo, getCalendarRange } from "@/utils/calendarHelper";

import { CalendarHeader } from "./CalendarHeader";
import { EngagementBar } from "./EngagementBar";
import { ProjectEngagement } from "./GanttChart.types";
import { ProjectBar } from "./ProjectBar";
import { TaskBar } from "./TaskBar";
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

export const GanttChart = ({
  projectEngagementData,
}: {
  projectEngagementData: ProjectEngagement[];
}) => {
  const [selectedOption, setSelectedOption] = useState<
    "yearly" | "monthly" | "weekly"
  >("weekly");

  const options = [
    { value: "monthly", label: "monthly" },
    { value: "yearly", label: "yearly" },
    { value: "weekly", label: "weekly" },
  ];

  const handleDropdownChange = (value: "yearly" | "monthly" | "weekly") => {
    setSelectedOption(value);
  };

  const allEngagements = projectEngagementData.map((v) => v.engagements).flat();
  //TODO: take task dates into consideration
  const allStartDate = allEngagements.map((v) => moment(v.startDate));
  const allEndDate = allEngagements.map((v) =>
    moment(v.completedDate ? v.completedDate : v.dueDate ?? v.startDate),
  );
  const earliestStartDate = moment.min(allStartDate).toDate();
  const latestEndDate = moment.max(allEndDate).toDate();

  const calendarRange = getCalendarRange(earliestStartDate, latestEndDate);

  const mappedProjectEngagements = projectEngagementData.flatMap((project) =>
    project.engagements.map((engagement) => {
      const engagementBar = getBarInfo(
        new Date(engagement.startDate),
        new Date(engagement.dueDate),
        new Date(engagement.completedDate),
        earliestStartDate,
        selectedOption,
      );
      return {
        ...engagement,
        bar: engagementBar,
        project: {
          id: project.id,
          name: project.name,
          registry: project.registry,
          registryProjectId: project.registryProjectId,
          types: project.types,
          countries: project.countries,
          bar: engagementBar,
        },
        tasks: engagement.tasks.map((task) => ({
          ...task,
          bar: getBarInfo(
            new Date(task.startDate),
            new Date(task.dueDate),
            new Date(task.completedDate),
            earliestStartDate,
            selectedOption,
          ),
        })),
      };
    }),
  );

  return (
    <div style={{ width: "1280px" }}>
      <div style={{ width: "500px" }}>
        <Dropdown
          options={options}
          value={selectedOption}
          onChange={handleDropdownChange}
        />
      </div>
      <StyledCalendarContainer>
        <CalendarHeader range={calendarRange} view={selectedOption} />
        <CalendarBackground
          width={Number(
            {
              monthly: calendarRange.duration.numberOfDays * 40,
              yearly: calendarRange.duration.numberOfMonths * 124,
              weekly: calendarRange.duration.numberOfWeeks * 155,
            }[selectedOption],
          )}
          view={selectedOption}
        >
          {mappedProjectEngagements.map((v) => {
            return (
              <>
                <ProjectBar key={v.id} projectData={v.project} />
                <EngagementBar key={v.id} engagementData={v} />
                {v.tasks.map((v) => (
                  <TaskBar key={v.id} taskData={v} />
                ))}
              </>
            );
          })}
        </CalendarBackground>
      </StyledCalendarContainer>
    </div>
  );
};
