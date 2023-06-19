import type { Meta } from "@storybook/react";
import { StoryFn } from "@storybook/react";

import { GanttChart } from "./GanttChart";
import { ProjectEngagement } from "./GanttChart.types";

interface GanttChartProps {
  projectEngagementData: ProjectEngagement[];
}

const meta: Meta = {
  component: GanttChart,
};

export default meta;

const Template: StoryFn<GanttChartProps> = ({
  projectEngagementData,
}: GanttChartProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 1200,
        height: 600,
      }}
    >
      <GanttChart projectEngagementData={projectEngagementData} />
    </div>
  );
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  projectEngagementData: [],
};

export const NoEngagements = Template.bind({});
NoEngagements.args = {
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

export const NoTasks = Template.bind({});
NoTasks.args = {
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

export const MultipleProjects = Template.bind({});
MultipleProjects.args = {
  projectEngagementData: [
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
          projectId: "6438f5f517255dfde53c94356",
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
              id: "63b863d2fdbf66b24e1e2142314231fwdsfx9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Project Design Document",
              startDate: "2020-02-11T00:00:00Z",
              dueDate: "2021-02-15T00:00:00Z",
              completedDate: "2021-02-13T00:00:00Z",
              isOverdue: true,
              state: "IN_PROGRESS",
              stateHistory: [
                {
                  state: "IN_PROGRESS",
                  stateUpdatedAt: "2019-08-24T14:15:22Z",
                },
              ],
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63b863d2fdbasdf223b24esadfgsadfwdasf1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "GSC",
              startDate: "2021-01-11T00:00:00Z",
              dueDate: "2022-09-15T00:00:00Z",
              completedDate: "2022-09-16T00:00:00Z",
              isOverdue: false,
              state: "COMPLETED",
              stateHistory: [
                {
                  state: "COMPLETED",
                  stateUpdatedAt: "2019-08-24T14:15:22Z",
                },
              ],
              assignee: "Other",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63b863d2fdbasdf223b24egq34gwavfsq34ergwfads1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Engagement of consultant lore..",
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
              assignee: "Consultant",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63b863d2fdbasdf223b23ghqefsgsdafads4e1e9f12",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63b863d2fdbasdf22335gewfdgh4wresfvdb24e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Document collection",
              startDate: "2021-02-11T00:00:00Z",
              dueDate: "2021-02-11T00:00:00Z",
              completedDate: "2021-02-11T00:00:00Z",
              isOverdue: true,
              state: "NOT_STARTED",
              stateHistory: [
                {
                  state: "NOT_STARTED",
                  stateUpdatedAt: "2019-08-24T14:15:22Z",
                },
              ],
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63b863d2fdbasdf223b24e13fvedf311e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Project Design Document",
              startDate: "2021-02-11T00:00:00Z",
              dueDate: "2021-02-12T00:00:00Z",
              completedDate: "2021-02-12T00:00:00Z",
              isOverdue: true,
              state: "NOT_STARTED",
              stateHistory: [
                {
                  state: "NOT_STARTED",
                  stateUpdatedAt: "2019-08-24T14:15:22Z",
                },
              ],
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63b863d2fdbasdsdfsdff223b24e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Project Design Document",
              startDate: "2021-02-11T00:00:00Z",
              dueDate: "2021-02-14T00:00:00Z",
              completedDate: "2021-03-14T00:00:00Z",
              isOverdue: true,
              state: "COMPLETED",
              stateHistory: [
                {
                  state: "NOT_STARTED",
                  stateUpdatedAt: "2019-08-24T14:15:22Z",
                },
              ],
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63b863d2fdbasddfdfdfdfdfdsdfsdff223b24e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Project Design Document",
              startDate: "2021-02-11T00:00:00Z",
              dueDate: "2022-09-15T00:00:00Z",
              completedDate: "2023-03-14T00:00:00Z",
              isOverdue: true,
              state: "COMPLETED",
              stateHistory: [
                {
                  state: "NOT_STARTED",
                  stateUpdatedAt: "2019-08-24T14:15:22Z",
                },
              ],
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdbasddfdfdfdfdfdsdfsdff223b24e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Project Design Document",
              startDate: "2021-02-11T00:00:00Z",
              dueDate: "2022-09-15T00:00:00Z",
              completedDate: "2024-09-24T08:22:20.099Z",
              isOverdue: true,
              state: "COMPLETED",

              stateHistory: [
                {
                  state: "NOT_STARTED",
                  stateUpdatedAt: "2019-08-24T14:15:22Z",
                },
              ],
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfdfdfdfdsdff223b24e1e9f12",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfdfdfdfdsdf23b24e1e9f12",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e19f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b3324e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e1e93f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e1e9ff12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e1e9333f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e1e9flkk12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b2400e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "2222222",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff22j3b24e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Consultant",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b2432e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsd3b24e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfs4e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e1e9f1",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddf4e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223fewfdwe24e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdfsdvsf23f9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
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
      id: "6438f5f5172helloe53c94356",
      name: "Songtao, Tongren, Wanshan and Yuping Rural Methane Pro",
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
          projectId: "6438f5f5172helloe53c94356",
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
              id: "63b863d2fdbf66b24e1e2142314231fwdsfx9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Project Design Document",
              startDate: "2021-02-11T00:00:00Z",
              dueDate: "2021-02-15T00:00:00Z",
              completedDate: "2021-02-13T00:00:00Z",
              isOverdue: true,
              state: "IN_PROGRESS",
              stateHistory: [
                {
                  state: "IN_PROGRESS",
                  stateUpdatedAt: "2019-08-24T14:15:22Z",
                },
              ],
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },

            {
              id: "63fdfdfdfdfdsdff223b24e1e9f12",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfdfdfdfdsdf23b24e1e9f12",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e19f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b3324e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e1e93f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e1e9ff12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e1e9333f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e1e9flkk12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b2400e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },

            {
              id: "63fdfddfsd3b24e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfs4e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e1e9f1",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddf4e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
          ],
          createdAt: "2023-06-05T16:00:00.000Z",
          updatedAt: "2023-06-07T16:00:00.000Z",
        },
        {
          id: "6438f5f517255023453c94347hello",
          projectId: "6438f5f5172helloe53c94356",
          type: "Issuance",
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
              id: "63b863d2fdbf66b24e1e2142314231fwdsfx9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Super Important Task",
              startDate: "2021-02-11T00:00:00Z",
              dueDate: "2021-02-15T00:00:00Z",
              completedDate: "2021-02-13T00:00:00Z",
              isOverdue: true,
              state: "IN_PROGRESS",
              stateHistory: [
                {
                  state: "IN_PROGRESS",
                  stateUpdatedAt: "2019-08-24T14:15:22Z",
                },
              ],
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },

            {
              id: "63fdfdfdfdfdsdff223b24e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Feasibility Study Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfdfdfdfdsdf23b24e1e9f12",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e19f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b3324e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e1e93f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e1e9ff12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e1e9333f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e1e9flkk12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b2400e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },

            {
              id: "63fdfddfsd3b24e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfs4e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },
            {
              id: "63fdfddfsdff223b24e1e9f12",
              engagementId: "63bd887fa62f3170407d1c42",
              type: "Some Important Task",
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
              assignee: "Client",
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

export const NoScrollView = Template.bind({});
NoScrollView.args = {
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
        {
          id: "CHN",
          name: "China",
          iso2Name: "CH",
          iso3Name: "CHN",
        },
        {
          id: "BRA",
          name: "Brazil",
          iso2Name: "BR",
          iso3Name: "BRA",
        },
      ],
      isActive: true,
      engagements: [
        {
          id: "6438f5f5172fef504e53c94347",
          projectId: "6438f5f51725504e53c94356",
          type: "Registration",
          startDate: "2021-02-16T14:01:22Z",
          dueDate: "2021-02-16T14:15:22Z",
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
              dueDate: "2021-03-12T00:00:00Z",
              completedDate: null,
              isOverdue: true,
              state: "NOT_STARTED",
              stateHistory: [
                {
                  state: "NOT_STARTED",
                  stateUpdatedAt: "2019-08-24T14:15:22Z",
                },
              ],
              assignee: "Client",
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
              id: "63b863d2fdbf66b24e1e2142314231fwdsfx9f12",
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
              assignee: "Consultant",
              createdAt: "2023-04-11T14:15:22Z",
              updatedAt: "2023-04-24T14:15:22Z",
            },

            {
              id: "63b863d2fdbasdf223b24egq34gwavfsq34ergwfads1e9f12",
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
              assignee: "Client",
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
