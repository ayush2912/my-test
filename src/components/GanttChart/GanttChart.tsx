import moment from "moment";
import styled from "styled-components";

import { getBarInfo, getCalendarRange } from "@/utils/calendarHelper";

import { CalendarHeader } from "./CalendarHeader";
import { EngagementBar } from "./EngagementBar";
import { engagementlistmockdata } from "./engagementlistmockdata";
import { ProjectBar } from "./ProjectBar";
import { TaskBar } from "./TaskBar";

export const GanttChart = ({
  selectedOption,
}: {
  selectedOption: "yearly" | "monthly" | "weekly";
}) => {
  const CalendarBody = styled.div<{
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

  const allEngagements = engagementlistmockdata
    .map((v) => v.engagements)
    .flat();

  const allStartDate = allEngagements.map((v) => moment(v.startDate));
  const allEndDate = allEngagements.map((v) =>
    moment(v.completedDate ? v.completedDate : v.dueDate ?? v.startDate),
  );
  const earliestStartDate = moment.min(allStartDate).toDate();
  const latestEndDate = moment.max(allEndDate).toDate();

  const calendarRange = getCalendarRange(earliestStartDate, latestEndDate);

  const engagementsWithProjectInfo = engagementlistmockdata.flatMap((project) =>
    project.engagements.map((engagement) => ({
      project: {
        id: project.id,
        name: project.name,
        registry: project.registry,
        registryProjectId: project.registryProjectId,
        types: project.types,
        countries: project.countries,
        bar: getBarInfo(
          new Date(engagement.startDate),
          new Date(engagement.dueDate),
          new Date(engagement.completedDate),
          earliestStartDate,
          selectedOption,
        ),
      },
      ...engagement,
      bar: getBarInfo(
        new Date(engagement.startDate),
        new Date(engagement.dueDate),
        new Date(engagement.completedDate),
        earliestStartDate,
        selectedOption,
      ),
      tasks: engagement.tasks.map((v) => {
        return {
          ...v,
          bar: getBarInfo(
            new Date(v.startDate),
            new Date(v.dueDate),
            new Date(v.completedDate),
            earliestStartDate,
            selectedOption,
          ),
        };
      }),
    })),
  );

  const BarsGroupedByEngagement = ({ data }: any) => {
    const taskBars = data.tasks.map((v) => <TaskBar key={v.id} taskData={v} />);

    return (
      <>
        <ProjectBar projectData={data.project} />
        <EngagementBar engagementData={data} />
        {taskBars}
      </>
    );
  };

  return (
    <div style={{ width: "1280px" }}>
      <StyledCalendarContainer>
        <CalendarHeader range={calendarRange} view={selectedOption} />
        <CalendarBody
          width={Number(
            {
              monthly: calendarRange.duration.numberOfDays * 40,
              yearly: calendarRange.duration.numberOfMonths * 124,
              weekly: calendarRange.duration.numberOfWeeks * 155,
            }[selectedOption],
          )}
          view={selectedOption}
        >
          {engagementsWithProjectInfo.map((v) => {
            return <BarsGroupedByEngagement key={v.id} data={v} />;
          })}
        </CalendarBody>
      </StyledCalendarContainer>
    </div>
  );
};
