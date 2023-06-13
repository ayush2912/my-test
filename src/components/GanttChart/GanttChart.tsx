import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { EngagementBar } from "./Bar/EngagementBar";
import { TaskBar } from "./Bar/TaskBar";
import { ICalendar } from "./Calendar/Calendar.types";
import { CalendarBackground } from "./Calendar/CalendarBackground";
import { CalendarHeader } from "./Calendar/CalendarHeader";
import { EngagementListItem } from "./EngagementListItem";
import { IMappedEngagements } from "./GanttChart.types";
import { GanttChartControls } from "./GanttChartControls";
import { TaskListItem } from "./TaskListItem";
import { TodayFocus } from "./TodayFocus";
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

const Container = styled.div`
  width: 100%;
  height: 500px;
  overflow: auto;
  position: relative;

  &::-webkit-scrollbar {
    height: 8px;
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

const ProjectNameContainer = styled.div<{ isCollapsed: boolean }>`
  padding: 2px 40px 11px 16px;
  width: 385px;
  visibility: ${({ isCollapsed }) => (isCollapsed ? "hidden" : "visible")};
  transition: visibility 0.1s ease-in-out;
  p {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    white-space: pre-wrap;
    -webkit-box-orient: vertical;
  }
`;

const CollapseButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  height: 24px;
  padding: 10px 12px;
  cursor: pointer;
`;

const Content = styled.div`
  width: 100%;
  height: fit-content;
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  width: fit-content;
  background: white;
  display: flex;
  z-index: 4;
`;

const Body = styled.div`
  width: fit-content;
  display: flex;
  height: 100%;
`;

const LeftPanel = styled.div<{ isCollapsed: boolean }>`
  position: sticky;
  left: 0;
  width: ${({ isCollapsed }) => (isCollapsed ? 24 : 385)}px;
  overflow: hidden;
  z-index: 3;
  border-right: 1px solid #e1e4e8;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.1);
  background: white;
  transition: width 0.3s ease-in-out;
`;

const LeftPanelHeader = styled.div<{ isCollapsed: boolean }>`
  width: ${({ isCollapsed }) => (isCollapsed ? 24 : 385)}px;
  position: sticky;
  left: 0;
  z-index: 2;
  overflow: hidden;
  background: white;
  border-top: 1px solid #e1e4e8;
  border-bottom: 1px solid #e1e4e8;
  border-right: 1px solid #e1e4e8;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease-in-out;
`;

export const GanttChart = ({
  engagements,
  calendar,
  selectedProjectId,
}: {
  engagements: IMappedEngagements;
  calendar: ICalendar;
  selectedProjectId: string | null;
}) => {
  const {
    view,
    onScroll,
    changeView,
    selectedEngagement,
    setEngagements,
    reset,
  } = useGanttChartControls();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const todayRef = useRef<HTMLDivElement | null>(null);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    setEngagements(engagements);
    return () => {
      reset();
    };
  }, [engagements]);

  const focusToday = () => {
    changeView("monthly");
    setTimeout(() => {
      if (todayRef.current)
        todayRef.current.scrollIntoView({
          behavior: "auto",
          block: "center",
          inline: "center",
        });
    }, 500);
  };

  return (
    <Card>
      <GanttChartControls
        selectedProjectId={selectedProjectId}
        onTodayButtonClick={focusToday}
      />
      {selectedEngagement.id ? (
        <Container
          onWheel={(e: any) => {
            onScroll(e);
          }}
        >
          <Content>
            <Header>
              <LeftPanelHeader isCollapsed={isCollapsed}>
                <CollapseButtonContainer>
                  <span onClick={handleCollapse}>
                    <Icon
                      name={isCollapsed ? "chevronsRight" : "chevronsLeft"}
                      size="xsmall"
                    />
                  </span>
                </CollapseButtonContainer>
                <ProjectNameContainer isCollapsed={isCollapsed}>
                  <p>{selectedEngagement.projectName} </p>
                </ProjectNameContainer>
              </LeftPanelHeader>
              <CalendarHeader
                calendarHeader={calendar.header}
                view={view}
                earliestStartDate={calendar.earliestStartDate}
                offsetForToday={calendar.offsetForToday}
                todayRef={todayRef}
              />
            </Header>

            <Body>
              <LeftPanel isCollapsed={isCollapsed}>
                {!isCollapsed && (
                  <>
                    <EngagementListItem data={selectedEngagement} />
                    {selectedEngagement.tasks.map((v) => (
                      <TaskListItem key={v.id} data={v} />
                    ))}
                  </>
                )}
              </LeftPanel>
              <CalendarBackground width={calendar.width[view]} view={view}>
                {view === "monthly" && (
                  <TodayFocus
                    offsetLeft={calendar.offsetForToday * 40}
                    calendarBoxWidth={48}
                  />
                )}
                <>
                  <EngagementBar
                    key={selectedEngagement.id}
                    engagementData={selectedEngagement}
                  />
                  {selectedEngagement.tasks.map((v) => (
                    <TaskBar isOverDue={v.isOverdue} key={v.id} taskData={v} />
                  ))}
                </>
              </CalendarBackground>
            </Body>
          </Content>
        </Container>
      ) : (
        <EmptyStateContainer>
          <img src={EmptyBox} />
          <Text type="heading3">No data available</Text>

          <div style={{ width: 336, textAlign: "center" }}>
            <Text type="body" color="subdued">
              Try selecting a project and an engagement.
            </Text>
          </div>
        </EmptyStateContainer>
      )}
    </Card>
  );
};
