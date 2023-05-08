import styled from "styled-components";

import { EngagementBar } from "./EngagementBar";
import { ProjectBar } from "./ProjectBar";
import { TaskBar } from "./TaskBar";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 8px 0px;
  user-select: none;
`;

export const GanttChartBar = ({
  barWidth,
  offsetFromLeft,
  type,
}: {
  barWidth: number;
  offsetFromLeft: number;
  type: "project" | "engagement" | "task";
}) => {
  return (
    <Container>
      {
        {
          project: (
            <ProjectBar barWidth={barWidth} offsetFromLeft={offsetFromLeft} />
          ),
          engagement: (
            <EngagementBar
              barWidth={barWidth}
              offsetFromLeft={offsetFromLeft}
            />
          ),
          task: <TaskBar barWidth={barWidth} offsetFromLeft={offsetFromLeft} />,
        }[type]
      }
    </Container>
  );
};
