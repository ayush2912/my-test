import type { Meta, StoryObj } from "@storybook/react";

import GanttChartLengend from "./GanttChartLegend";

const meta: Meta<typeof GanttChartLengend> = {
  title: "Gantt Chart/Legend",
  component: GanttChartLengend,
};

export default meta;

type Story = StoryObj<typeof GanttChartLengend>;

export const Sample: Story = {
  render: () => <GanttChartLengend />,
};
