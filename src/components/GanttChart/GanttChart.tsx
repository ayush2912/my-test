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
import EmptyBox from "../../assets/images/empty-box.png";
import Card from "../Card";
import Text from "../Text";

const StyledCalendarContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding-top: 24px;
  border-top: 1px solid #e1e4e8;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c4c9d1;
    border-radius: 16px;
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 45px;
  align-items: center;
`;

const CalendarBackgroundWrapper = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 500px;
  width: ${(props) => props.width}px;
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
      {mappedProjectEngagements.length ? (
        <StyledCalendarContainer>
          <CalendarHeader calendarHeader={calendar.header} view={view} />
          <CalendarBackgroundWrapper width={calendar.width[view]}>
            <CalendarBackground width={calendar.width[view]} view={view}>
              {mappedProjectEngagements.map((v) => {
                return (
                  <>
                    <ProjectBar key={v.id + "p"} projectData={v.project} />
                    <EngagementBar key={v.id + "e"} engagementData={v} />
                    {v.tasks.map((v) => (
                      <TaskBar key={v.id} taskData={v} />
                    ))}
                  </>
                );
              })}
            </CalendarBackground>
          </CalendarBackgroundWrapper>
        </StyledCalendarContainer>
      ) : (
        <EmptyStateContainer>
          <img src={EmptyBox} />
          <Text type="heading3">No data available</Text>

          <div style={{ width: 336, textAlign: "center" }}>
            <Text type="body" color="subdued">
              No active engagements or tasks to show. You will be notified when
              an engagement is added.
            </Text>
          </div>
        </EmptyStateContainer>
      )}
    </Card>
  );
};
