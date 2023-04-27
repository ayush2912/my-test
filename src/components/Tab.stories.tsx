import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import Tabs, { TabData } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Tabs",
  component: Tabs,
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const TabDisplay: Story = {
  render: () => {
    const tabs = [
      {
        label: "Project Information",
        value: "PI",
      },
      {
        label: "Engagements and Tasks",
        value: "ET",
      },
    ] as Array<TabData>;

    const [selectedTab, setSelectedTab] = useState<string>("PI");

    return (
      <Tabs selectedTab={selectedTab} tabs={tabs} onSelect={setSelectedTab} />
    );
  },
};
