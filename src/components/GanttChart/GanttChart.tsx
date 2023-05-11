import styled from "styled-components";

import { EngagementBar } from "./Bar/EngagementBar";
import { ProjectBar } from "./Bar/ProjectBar";
import { TaskBar } from "./Bar/TaskBar";
import { ICalendar } from "./Calendar/Calendar.types";
import { CalendarBackground } from "./Calendar/CalendarBackground";
import { CalendarHeader } from "./Calendar/CalendarHeader";
import { IMappedEngagements } from "./GanttChart.types";
import { GanttChartControls } from "./GanttChartControls";
import useGanttChartControls from "./useGanttChartControls";
import Card from "../Card";

const StyledCalendarContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding-top: 24px;
  border-top: 1px solid #e1e4e8;
  overflow-x: scroll;
`;

export const GanttChart = ({
  mappedProjectEngagements,
  calendar,
}: {
  mappedProjectEngagements: IMappedEngagements;
  calendar: ICalendar;
}) => {
  const { view } = useGanttChartControls();

  return (
    <Card>
      <GanttChartControls />
      <StyledCalendarContainer>
        <CalendarHeader calendarHeader={calendar.header} view={view} />
        <CalendarBackground width={calendar.width[view]} view={view}>
          {mappedProjectEngagements.map((v) => {
            return (
              <div key={v.id}>
                <ProjectBar key={v.id + "p"} projectData={v.project} />
                <EngagementBar key={v.id + "e"} engagementData={v} />
                {v.tasks.map((v) => (
                  <TaskBar key={v.id} taskData={v} />
                ))}
              </div>
            );
          })}
        </CalendarBackground>
      </StyledCalendarContainer>
    </Card>
  );
};
