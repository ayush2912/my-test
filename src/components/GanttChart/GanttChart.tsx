import moment from "moment";
import { useMemo, useState } from "react";
import styled from "styled-components";

import { getBarInfo, getCalendarInfo } from "@/utils/calendarHelper";

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
  projectEngagementData,
}: {
  projectEngagementData: ProjectEngagement[];
}) => {
  const [selectedOption, setSelectedOption] = useState<
    "yearly" | "monthly" | "weekly"
  >("monthly");

  const options = [
    { value: "monthly", label: "monthly" },
    { value: "yearly", label: "yearly" },
    { value: "weekly", label: "weekly" },
  ];

  const handleDropdownChange = (value: "yearly" | "monthly" | "weekly") => {
    setSelectedOption(value);
  };

  const calendar = useMemo(() => {
    const allEngagements = projectEngagementData
      .map((v) => v.engagements)
      .flat();

    const allTasks = allEngagements.map((v) => v.tasks).flat();

    const allStartDate = [
      ...allEngagements.map((v) => moment(v.startDate)),
      ...allTasks.map((v) => moment(v.startDate)),
    ];
    const allEndDate = [
      ...allEngagements.map((v) =>
        moment(v.completedDate ? v.completedDate : v.dueDate ?? v.startDate),
      ),
      ...allTasks.map((v) =>
        moment(v.completedDate ? v.completedDate : v.dueDate ?? v.startDate),
      ),
    ];
    const earliestStartDate = moment.min(allStartDate).toDate();
    const latestEndDate = moment.max(allEndDate).toDate();
    const info = getCalendarInfo(earliestStartDate, latestEndDate);
    return {
      earliestStartDate,
      latestEndDate,
      info,
    };
  }, [projectEngagementData]);

  const mappedProjectEngagements = projectEngagementData.flatMap((project) =>
    project.engagements.map((engagement) => {
      const engagementBar = getBarInfo(
        new Date(engagement.startDate),
        new Date(engagement.dueDate),
        new Date(engagement.completedDate),
        calendar.earliestStartDate,
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
            calendar.earliestStartDate,
            selectedOption,
          ),
        })),
      };
    }),
  );

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
    </Card>
  );
};
