import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { EngagementBar } from "./Bar/EngagementBar";
import { TaskBar } from "./Bar/TaskBar";
import { ICalendar } from "./Calendar/Calendar.types";
import { CalendarBackground } from "./Calendar/CalendarBackground";
import { CalendarHeader } from "./Calendar/CalendarHeader";
import { IMappedEngagements } from "./GanttChart.types";
import { GanttChartControls } from "./GanttChartControls";
import { TaskListItem } from "./TaskListItem";
import TodayFocus from "./TodayFocus";
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

const BodyContainer = styled.div`
  display: flex;
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c4c9d1;
    border-radius: 16px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  overflow-y: scroll;
`;
const LeftPanel = styled.div<{
  isCollapsed: boolean;
}>`
  flex: ${({ isCollapsed }) => (isCollapsed ? "0 0 24px" : "0 0 385px")};
  transition: flex 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  min-width: 24px;

  height: fit-content;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: fit-content;
  margin-right: 8px;

  width: calc(100% - 385px);
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
const HeaderLeftPanel = styled.div<{
  isCollapsed: boolean;
}>`
  flex: ${({ isCollapsed }) => (isCollapsed ? "0 0 24px" : "0 0 385px")};
  transition: flex 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  min-width: 24px;

  height: fit-content;
`;
const HeaderRightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: fit-content;
  margin-right: 8px;
  pointer-events: none;
  width: calc(100% - 385px);
  overflow-x: scroll;

  &::-webkit-scrollbar {
    height: 0px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;

const LeftPanelHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 82px;

  border-top: 1px solid #e1e4e8;
  border-bottom: 1px solid #e1e4e8;
  border-right: 1px solid #e1e4e8;
`;

const ProjectNameContainer = styled.div<{ isCollapsed: boolean }>`
  padding: 2px 40px 11px 16px;
  width: 385px;
  visibility: ${({ isCollapsed }) => (isCollapsed ? "hidden" : "visible")};
  transition: visibility 0.1s ease-in-out;
`;
const CollapseButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  height: 24px;
`;

const TaskListContainer = styled.div<{ isCollapsed: boolean }>`
  display: flex;
  flex-direction: column;
  visibility: ${({ isCollapsed }) => (isCollapsed ? "hidden" : "visible")};
  transition: visibility 0.1s ease-in-out;
`;

const LeftPanelBody = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GanttChart = ({
  mappedProjectEngagements,
  calendar,
}: {
  mappedProjectEngagements: IMappedEngagements;
  calendar: ICalendar;
}) => {
  const { view, onScroll } = useGanttChartControls();
  const calendarBackgroundRef = useRef<HTMLDivElement | null>(null);
  const taskListContainerRef = useRef<HTMLDivElement | null>(null);
  const leftPanelBodyRef = useRef<HTMLDivElement | null>(null);
  const calendarHeaderRef = useRef<HTMLDivElement | null>(null);
  const calendarBodyRef = useRef<HTMLDivElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    calendarBodyRef.current?.addEventListener("wheel", onScroll);

    return () => {
      calendarBodyRef.current?.removeEventListener("wheel", onScroll);
    };
  }, []);

  const onBodyScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (calendarHeaderRef.current) {
      calendarHeaderRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  return (
    <Card>
      <GanttChartControls />
      {/* header */}
      <HeaderContainer>
        <HeaderLeftPanel isCollapsed={isCollapsed}>
          <LeftPanelHeaderContainer>
            <CollapseButtonContainer>
              <span onClick={handleCollapse}>
                <Icon name="chevronsLeft" size="xsmall" />
              </span>
            </CollapseButtonContainer>
            <ProjectNameContainer isCollapsed={isCollapsed}>
              Songtao, Tongren, Wanshan and Yuping Rural Methane project
            </ProjectNameContainer>
          </LeftPanelHeaderContainer>
        </HeaderLeftPanel>
        <HeaderRightPanel ref={calendarHeaderRef}>
          <CalendarHeader calendarHeader={calendar.header} view={view} />
        </HeaderRightPanel>
      </HeaderContainer>
      {/* body */}
      <BodyContainer>
        <LeftPanel isCollapsed={isCollapsed}>
          <LeftPanelBody ref={leftPanelBodyRef}>
            <TaskListContainer
              ref={taskListContainerRef}
              isCollapsed={isCollapsed}
            >
              <TaskListItem key={12312321} name={"Engagement"} />
              {mappedProjectEngagements[0].tasks.map((v) => (
                <TaskListItem key={v.id} name={v.type} />
              ))}
            </TaskListContainer>
          </LeftPanelBody>
        </LeftPanel>

        <RightPanel ref={calendarBodyRef} onScroll={onBodyScroll}>
          {mappedProjectEngagements.length ? (
            <>
              {/* <CalendarBackgroundWrapper> */}
              <CalendarBackground
                ref={calendarBackgroundRef}
                width={calendar.width[view]}
                view={view}
              >
                {/* <TodayFocus offsetLeft={1000} calendarBoxWidth={1000} /> */}

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
              {/* </CalendarBackgroundWrapper> */}
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
      </BodyContainer>
    </Card>
  );
};
