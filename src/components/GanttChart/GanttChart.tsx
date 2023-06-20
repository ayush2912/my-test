import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { EngagementBar } from "./Bar/EngagementBar";
import { TaskBar } from "./Bar/TaskBar";
import { CalendarBackground } from "./Calendar/CalendarBackground";
import { CalendarHeader } from "./Calendar/CalendarHeader";
import { EngagementListItem } from "./EngagementListItem";
import {
  IMappedEngagement,
  IMappedEngagements,
  ProjectEngagement,
} from "./GanttChart.types";
import { GanttChartControls } from "./GanttChartControls";
import { TaskListItem } from "./TaskListItem";
import { TodayFocus } from "./TodayFocus";
import useGanttChartControls from "./useGanttChartControls";
import EmptyBox from "../../assets/images/empty-box.png";
import { useSearchParamsState } from "../../hooks/useSearchParamsState";
import { getBarInfo, memoizedCalendarData } from "../../utils/calendarHelper";
import { convertToMonthNameFormat } from "../../utils/dateTimeFormatter";
import Card from "../Card";
import Icon from "../Icon";
import Select from "../Select";
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
  height: 100%;
  overflow: scroll;
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

const Header = styled.div`
  position: sticky;
  top: 0;
  width: fit-content;
  background: white;
  display: flex;
  z-index: 4;
`;

const Body = styled.div`
  display: flex;
  width: fit-content;
  height: calc(100% - 8px - 82px);
`;

const LeftPanel = styled.div<{ isCollapsed: boolean }>`
  position: sticky;
  left: 0;
  width: ${({ isCollapsed }) => (isCollapsed ? 24 : 385)}px;
  height: fit-content;
  min-height: 100%;
  z-index: 3;
  border-right: 1px solid #e1e4e8;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.1);
  background: white;
  transition: width 0.3s ease-in-out;
  background-color: #ffffff;
  background-image: linear-gradient(
    to bottom,
    #ffffff 48px,
    rgba(241, 242, 244, 0.5) 1px
  );
  background-size: 48px 96px;

  ${(props) => props.isCollapsed && "background-image: none"};
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
const ListItemContainer = styled.div<{ isCollapsed: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: ${(props) => (props.isCollapsed ? 24 : 385)}px;
  opacity: ${(props) => (props.isCollapsed ? 0 : 1)};
  transition: all 0.3s ease-in-out;
`;

const GanttChartWrapper = styled.div`
  height: calc(100vh - 320px);
`;
export const GanttChart = ({
  projectEngagementData,
}: {
  projectEngagementData: ProjectEngagement[];
}) => {
  const { view, onScroll, changeView } = useGanttChartControls();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [projectOptions, setProjectOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const [selectedProjectId, setSelectedProjectId] = useState("");

  const [engagements, setEngagements] = useState<IMappedEngagements>([]);
  const [selectedEngagementId, setSelectedEngagementId] = useState("");
  const [engagementOptions, setEngagementOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [selectedEngagement, setSelectedEngagement] =
    useState<IMappedEngagement>({} as IMappedEngagement);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [calendar, setCalendar] = useState<any>([]);
  const todayRef = useRef<HTMLDivElement | null>(null);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    setProjectOptions(
      projectEngagementData.map((v) => ({
        value: v.id,
        label: v.name,
      })),
    );

    const calendarData = memoizedCalendarData(projectEngagementData);
    setCalendar(calendarData);

    setEngagements(
      projectEngagementData.flatMap((project) =>
        project.engagements.map((engagement) => {
          const engagementBar = getBarInfo(
            new Date(engagement.startDate),
            new Date(engagement.dueDate),
            engagement.completedDate
              ? new Date(engagement.completedDate)
              : null,
            calendarData.earliestStartDate,
          );

          return {
            ...engagement,
            projectName: project.name,
            bar: engagementBar,
            onViewClick: (id: string) => {
              navigate(`/projects/${id}`);
            },

            tasks: engagement.tasks.map((task) => ({
              ...task,
              bar: getBarInfo(
                new Date(task.startDate),
                new Date(task.dueDate),
                task.completedDate ? new Date(task.completedDate) : null,
                calendarData.earliestStartDate,
              ),
            })),
          };
        }),
      ),
    );

    const projectId = searchParams.get("project");
    const engagementId = searchParams.get("engagement");
    console.log(projectId, engagementId);
    if (projectId) setSelectedProjectId(projectId);
    if (engagementId) setSelectedEngagementId(engagementId);
  }, [projectEngagementData]);

  useEffect(() => {
    if (Boolean(selectedProjectId) && engagements.length) {
      const options = engagements
        .filter((v) => v.projectId === selectedProjectId)
        .map((v) => ({
          value: v.id,
          label: v.type,
          sublabel: `(${convertToMonthNameFormat(
            v.startDate,
          )} - ${convertToMonthNameFormat(v.dueDate)})`,
        }));
      setEngagementOptions(options);
      searchParams.set("project", selectedProjectId);
      setSearchParams(searchParams);
    }
  }, [selectedProjectId]);

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

  const handleSelectProject = (projectId: string) => {
    setSelectedEngagementId("");
    setSelectedProjectId(projectId);
  };

  const handleSelectEngagement = (engagementId: string) => {
    setSelectedEngagementId(engagementId);
  };

  useEffect(() => {
    if (Boolean(selectedEngagementId) && engagements) {
      const selected =
        engagements?.find((v) => v.id === selectedEngagementId) ||
        ({} as IMappedEngagement);

      setSelectedEngagement(selected);
      searchParams.set("engagement", selectedEngagementId);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("engagement");
      setSearchParams(searchParams);
      setSelectedEngagement({} as IMappedEngagement);
    }
  }, [selectedEngagementId]);

  return (
    <div>
      <Text type="heading3">Engagements</Text>
      <div style={{ width: 523, marginTop: 40, marginBottom: 24 }}>
        <Select
          selected={selectedProjectId}
          options={projectOptions}
          placeholder="Select a Project"
          onSelect={handleSelectProject}
        />
      </div>

      <GanttChartWrapper>
        <Card>
          <GanttChartControls
            selectedEngagementId={selectedEngagementId}
            engagementOptions={engagementOptions}
            onSelectEngagement={handleSelectEngagement}
            onTodayButtonClick={focusToday}
          />
          {selectedEngagement.id ? (
            <Container
              onWheel={(e: any) => {
                onScroll(e);
              }}
            >
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
                  selectedEngagement={selectedEngagement}
                  calendarHeader={calendar.header}
                  view={view}
                  earliestStartDate={calendar.earliestStartDate}
                  offsetForToday={calendar.offsetForToday}
                  todayRef={todayRef}
                />
              </Header>

              <Body>
                <LeftPanel isCollapsed={isCollapsed}>
                  <ListItemContainer isCollapsed={isCollapsed}>
                    <EngagementListItem data={selectedEngagement} />
                    {selectedEngagement.tasks.map((v) => (
                      <TaskListItem key={v.id} data={v} />
                    ))}
                  </ListItemContainer>
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
                      <TaskBar
                        isOverDue={v.isOverdue}
                        key={v.id}
                        taskData={v}
                      />
                    ))}
                  </>
                </CalendarBackground>
              </Body>
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
      </GanttChartWrapper>
    </div>
  );
};
