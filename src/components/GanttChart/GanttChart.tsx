import { useEffect, useRef, useState } from "react";
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

const ContainerWrapper = styled.div`
  display: flex;
  height: 500px;
`;

const LeftPanel = styled.div<{
  isCollapsed: boolean;
}>`
  flex: ${({ isCollapsed }) => (isCollapsed ? "0 0 24px" : "0 0 385px")};
  transition: flex 0.3s ease-in-out;

  overflow: hidden;
  min-width: 24px;
`;

const RightPanel = styled.div`
  flex: 1;
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

const LeftPanelHeader = styled.div`
  height: 82px;
  width: "100%";
  border-top: 1px solid #e1e4e8;
  border-bottom: 1px solid #e1e4e8;
  border-right: 1px solid #e1e4e8;
`;

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LeftPanelBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 411px;
  overflow-y: scroll;

  /* Hide the scrollbar */
  ::-webkit-scrollbar {
    width: 0.5rem; /* Adjust the width as needed */
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

const TaskListItem = styled.div`
  height: 628px;
  width: 385px;
`;

export const GanttChart = ({
  mappedProjectEngagements,
  calendar,
}: {
  mappedProjectEngagements: IMappedEngagements;
  calendar: ICalendar;
}) => {
  const { view, onScroll } = useGanttChartControls();
  const calendarBgWrapperRef = useRef<HTMLDivElement | null>(null);
  const calendarBackgroundRef = useRef<HTMLDivElement | null>(null);
  const taskListContainerRef = useRef<HTMLDivElement | null>(null);
  const leftPanelBodyRef = useRef<HTMLDivElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  useEffect(() => {
    calendarBgWrapperRef.current?.addEventListener("wheel", onScroll);

    return () => {
      calendarBgWrapperRef.current?.removeEventListener("wheel", onScroll);
    };
  }, []);

  useEffect(() => {
    if (calendarBackgroundRef.current && taskListContainerRef.current)
      taskListContainerRef.current.style.height = `${calendarBackgroundRef.current.clientHeight}px`;
  }, [calendarBackgroundRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (calendarBgWrapperRef.current && leftPanelBodyRef.current) {
        leftPanelBodyRef.current.scrollTop =
          calendarBgWrapperRef.current.scrollTop;
      }
    };
    const handleLeftBodyPanelScroll = () => {
      if (calendarBgWrapperRef.current && leftPanelBodyRef.current) {
        calendarBgWrapperRef.current.scrollTop =
          leftPanelBodyRef.current.scrollTop;
      }
    };

    calendarBgWrapperRef.current?.addEventListener("scroll", handleScroll);
    leftPanelBodyRef.current?.addEventListener(
      "scroll",
      handleLeftBodyPanelScroll,
    );

    return () =>
      calendarBgWrapperRef.current?.removeEventListener("scroll", handleScroll);
  }, [leftPanelBodyRef, calendarBgWrapperRef]);

  return (
    <Card>
      <GanttChartControls />
      <ContainerWrapper>
        <LeftPanel isCollapsed={isCollapsed}>
          <LeftPanelHeader>
            <button onClick={handleCollapse}>collapse</button>
          </LeftPanelHeader>
          <LeftPanelBody ref={leftPanelBodyRef}>
            <TaskListContainer ref={taskListContainerRef}>
              <TaskListItem>DVR (Draft Validation Report)</TaskListItem>
              <TaskListItem>Engagement of consultant lore..</TaskListItem>
              <TaskListItem>Project signed</TaskListItem>
              <TaskListItem>Appointment of DOE</TaskListItem>
              <TaskListItem>DVR (Draft Validation Report)</TaskListItem>
              <TaskListItem>DVR (Draft Validation Report)</TaskListItem>
              <TaskListItem>DVR (Draft Validation Report)</TaskListItem>
              <TaskListItem>DVR (Draft Validation Report)</TaskListItem>
              <TaskListItem>DVR (Draft Validation Report)</TaskListItem>
            </TaskListContainer>
          </LeftPanelBody>
        </LeftPanel>

        <RightPanel>
          {mappedProjectEngagements.length ? (
            <>
              <CalendarHeader calendarHeader={calendar.header} view={view} />
              <CalendarBackgroundWrapper
                ref={calendarBgWrapperRef}
                width={calendar.width[view]}
              >
                <CalendarBackground
                  ref={calendarBackgroundRef}
                  width={calendar.width[view]}
                  view={view}
                >
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
            </>
          ) : (
            <EmptyStateContainer>
              <img src={EmptyBox} />
              <Text type="heading3">No data available</Text>

              <div style={{ width: 336, textAlign: "center" }}>
                <Text type="body" color="subdued">
                  No active engagements or tasks to show. You will be notified
                  when an engagement is added.
                </Text>
              </div>
            </EmptyStateContainer>
          )}
        </RightPanel>
      </ContainerWrapper>
    </Card>
  );
};
