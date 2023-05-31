import type { Meta, StoryObj } from "@storybook/react";

import GantChartLengend from "./GanntChartLegend";

const meta: Meta<typeof GantChartLengend> = {
  title: "Projects/Components/ GantChartLengend",
  component: GantChartLengend,
};

export default meta;

type Story = StoryObj<typeof GantChartLengend>;

export const Sample: Story = {
  render: () => <GantChartLengend />,
};
