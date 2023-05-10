import type { Meta } from "@storybook/react";
import { StoryFn } from "@storybook/react";

import { engagementlistmockdata } from "./engagementlistmockdata";
import { GanttChart } from "./GanttChart";
import { ProjectEngagement } from "./GanttChart.types";

interface GanttChartProps {
  projectEngagementData: ProjectEngagement[];
}

const meta: Meta<GanttChartProps> = {
  title: "GanttChart",
  component: GanttChart,
};

export default meta;

const Template: StoryFn<GanttChartProps> = ({
  projectEngagementData,
}: GanttChartProps) => (
  <div style={{ width: 1280, boxSizing: "border-box" }}>
    <GanttChart projectEngagementData={projectEngagementData} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  projectEngagementData: engagementlistmockdata,
};
