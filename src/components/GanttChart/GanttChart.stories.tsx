import type { Meta } from "@storybook/react";
import { StoryFn } from "@storybook/react";

import { getBarInfo, memoizedCalendarData } from "@/utils/calendarHelper";

import { engagementlistmockdata } from "./engagementlistmockdata";
import { GanttChart } from "./GanttChart";
import { ProjectEngagement } from "./GanttChart.types";

interface GanttChartProps {
  projectEngagementData: ProjectEngagement[];
}

const meta: Meta = {
  title: "GanttChart",
  component: GanttChart,
};

export default meta;

const Template: StoryFn<GanttChartProps> = ({
  projectEngagementData,
}: GanttChartProps) => {
  const calendar = memoizedCalendarData(projectEngagementData);

  const mappedProjectEngagements = projectEngagementData.flatMap((project) =>
    project.engagements.map((engagement) => {
      const engagementBar = getBarInfo(
        new Date(engagement.startDate),
        new Date(engagement.dueDate),
        engagement.completedDate ? new Date(engagement.completedDate) : null,
        calendar.earliestStartDate,
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
          ),
        })),
      };
    }),
  );
  return (
    <div style={{ width: 1000, boxSizing: "border-box" }}>
      <GanttChart
        mappedProjectEngagements={mappedProjectEngagements}
        calendar={calendar}
      />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  projectEngagementData: engagementlistmockdata,
};

export const GanttChartWithoutEngagements = Template.bind({});
GanttChartWithoutEngagements.args = {
  projectEngagementData: [
    {
      id: "6438f5f51725504e53c94356",
      name: "150 MW Solar Project in Karnataka by Avaada Solar",
      registry: {
        id: "6438f5f51725504e53c94356",
        name: "Verra",
      },
      registryProjectId: "1851",
      types: [
        {
          id: "6438f6b71725504e53c94357",
          name: "Renewables",
        },
      ],
      countries: [
        {
          id: "IN",
          name: "India",
          iso2Name: "IN",
          iso3Name: "IND",
        },
      ],
      isActive: true,
      engagements: [],
      createdAt: "2023-06-05T16:00:00.000Z",
      updatedAt: "2023-06-08T16:00:00.000Z",
    },
  ],
};

export const GanttChartWithoutTasks = Template.bind({});
GanttChartWithoutTasks.args = {
  projectEngagementData: [
    {
      id: "6438f5f51725504e53c94356",
      name: "150 MW Solar Project in Karnataka by Avaada Solar",
      registry: {
        id: "6438f5f51725504e53c94356",
        name: "Verra",
      },
      registryProjectId: "1851",
      types: [
        {
          id: "6438f6b71725504e53c94357",
          name: "Renewables",
        },
      ],
      countries: [
        {
          id: "IN",
          name: "India",
          iso2Name: "IN",
          iso3Name: "IND",
        },
      ],
      isActive: true,
      engagements: [
        {
          id: "6438f5f51725504e53c94347",
          projectId: "6438f5f51725504e53c94356",
          type: "Registration",
          startDate: "2021-01-16T14:01:22Z",
          dueDate: "2022-05-14T14:15:22Z",
          completedDate: "2022-05-29T14:15:22Z",
          notes: "Project Document Added",
          state: "NOT_STARTED",
          stateHistory: [
            {
              state: "NOT_STARTED",
              stateUpdatedAt: "2019-08-24T14:15:22Z",
            },
          ],
          isOverdue: true,
          attributes: [
            {
              name: "Registry ID",
              type: "string",
              value: "S00208",
              key: "REGISTRY_ID",
            },
          ],
          tasks: [],
          createdAt: "2023-06-05T16:00:00.000Z",
          updatedAt: "2023-06-07T16:00:00.000Z",
        },
      ],
      createdAt: "2023-06-05T16:00:00.000Z",
      updatedAt: "2023-06-08T16:00:00.000Z",
    },
  ],
};

export const GanttChartWithMultipleProjects = Template.bind({});
GanttChartWithMultipleProjects.args = {
  projectEngagementData: [
    {
      id: "6438f5f51725504e53c94356",
      name: "150 MW Solar Project in Karnataka by Avaada Solar",
      registry: {
        id: "6438f5f51725504e53c94356",
        name: "Verra",
      },
      registryProjectId: "1851",
      types: [
        {
          id: "6438f6b71725504e53c94357",
          name: "Renewables",
        },
      ],
      countries: [
        {
          id: "IN",
          name: "India",
          iso2Name: "IN",
          iso3Name: "IND",
        },
      ],
      isActive: true,
      engagements: [
        {
          id: "6438f5f5172fef504e53c94347",
          projectId: "6438f5f51725504e53c94356",
          type: "Registration",
          startDate: "2021-02-16T14:01:22Z",
          dueDate: "2022-06-14T14:15:22Z",
          completedDate: null,
          notes: "Project Document Added",
          state: "NOT_STARTED",
          stateHistory: [
            {
              state: "NOT_STARTED",
              stateUpdatedAt: "2019-08-24T14:15:22Z",
            },
          ],
          isOverdue: true,
          attributes: [
            {
              name: "Registry ID",
              type: "string",
              value: "S00208",
              key: "REGISTRY_ID",
            },
          ],
          tasks: [
            {
              id: "63b863d2fdfghgfh66b24e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Project Design Document",
              startDate: "2021-03-11T00:00:00Z",
              dueDate: "2022-09-15T00:00:00Z",
              completedDate: "2023-09-24T08:22:20.099Z",
              isOverdue: true,
              state: "NOT_STARTED",
              stateHistory: [
                {
                  state: "NOT_STARTED",
                  stateUpdatedAt: "2019-08-24T14:15:22Z",
                },
              ],
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63b863d2fdbf62ashgthg24e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Project Design Document",
              startDate: "2021-02-11T00:00:00Z",
              dueDate: "2022-09-15T00:00:00Z",
              completedDate: "2022-09-24T08:22:20.099Z",
              isOverdue: true,
              state: "NOT_STARTED",
              stateHistory: [
                {
                  state: "NOT_STARTED",
                  stateUpdatedAt: "2019-08-24T14:15:22Z",
                },
              ],
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
          ],
          createdAt: "2023-06-05T16:00:00.000Z",
          updatedAt: "2023-06-07T16:00:00.000Z",
        },
      ],
      createdAt: "2023-06-05T16:00:00.000Z",
      updatedAt: "2023-06-08T16:00:00.000Z",
    },
    {
      id: "6438f5f517255dfde53c94356",
      name: "150 MW Solar Project in Karnataka by Avaada Solar",
      registry: {
        id: "6438f5f51725504e53c94356",
        name: "Verra",
      },
      registryProjectId: "1851",
      types: [
        {
          id: "6438f6b71725504e53c94357",
          name: "Renewables",
        },
      ],
      countries: [
        {
          id: "IN",
          name: "India",
          iso2Name: "IN",
          iso3Name: "IND",
        },
      ],
      isActive: true,
      engagements: [
        {
          id: "6438f5f517255023453c94347",
          projectId: "6438f5f51725504e53c94356",
          type: "Registration",
          startDate: "2021-01-16T14:01:22Z",
          dueDate: "2022-05-14T14:15:22Z",
          completedDate: "2022-05-29T14:15:22Z",
          notes: "Project Document Added",
          state: "NOT_STARTED",
          stateHistory: [
            {
              state: "NOT_STARTED",
              stateUpdatedAt: "2019-08-24T14:15:22Z",
            },
          ],
          isOverdue: true,
          attributes: [
            {
              name: "Registry ID",
              type: "string",
              value: "S00208",
              key: "REGISTRY_ID",
            },
          ],
          tasks: [
            {
              id: "63b863d2fdbf66b24e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Project Design Document",
              startDate: "2021-03-11T00:00:00Z",
              dueDate: "2022-09-15T00:00:00Z",
              completedDate: "2023-09-24T08:22:20.099Z",
              isOverdue: true,
              state: "NOT_STARTED",
              stateHistory: [
                {
                  state: "NOT_STARTED",
                  stateUpdatedAt: "2019-08-24T14:15:22Z",
                },
              ],
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63b863d2fdbasdf223b24e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Project Design Document",
              startDate: "2021-02-11T00:00:00Z",
              dueDate: "2022-09-15T00:00:00Z",
              completedDate: "2022-09-24T08:22:20.099Z",
              isOverdue: true,
              state: "NOT_STARTED",
              stateHistory: [
                {
                  state: "NOT_STARTED",
                  stateUpdatedAt: "2019-08-24T14:15:22Z",
                },
              ],
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
          ],
          createdAt: "2023-06-05T16:00:00.000Z",
          updatedAt: "2023-06-07T16:00:00.000Z",
        },
      ],
      createdAt: "2023-06-05T16:00:00.000Z",
      updatedAt: "2023-06-08T16:00:00.000Z",
    },
  ],
};
