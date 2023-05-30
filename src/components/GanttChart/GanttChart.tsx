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
import { TaskListItem } from "./TaskListItem";
import useGanttChartControls from "./useGanttChartControls";
import EmptyBox from "../../assets/images/empty-box.png";
import Card from "../Card";
import Icon from "../Icon";
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
  display: flex;
  flex-direction: column;

  overflow: hidden;
  min-width: 24px;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  width: 100%;
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

const ProjectNameContainer = styled.div`
  padding: 2px 40px 11px 16px;
  width: 385px;
`;
const CollapseButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  height: 24px;
`;

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LeftPanelBody = styled.div`
  display: flex;
  flex-direction: column;
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
            <CollapseButtonContainer>
              <span onClick={handleCollapse}>
                <Icon name="chevronsLeft" size="xsmall" />
              </span>
            </CollapseButtonContainer>
            <ProjectNameContainer>
              Songtao, Tongren, Wanshan and Yuping Rural Methane project
            </ProjectNameContainer>
          </LeftPanelHeader>
          <LeftPanelBody ref={leftPanelBodyRef}>
            <TaskListContainer ref={taskListContainerRef}>
              <TaskListItem key={12312321} name={"Engagement"} />
              {mappedProjectEngagements[0].tasks.map((v) => (
                <TaskListItem key={v.id} name={v.type} />
              ))}
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
