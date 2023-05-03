import type { Meta, StoryObj } from "@storybook/react";

import Icon, { IconNameType, IconNames } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Icon",
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

// const genericIcons: Array<IconNameType> = [
//   "home",
//   "success",
//   "message",
//   "file",
//   "notStarted",
//   "inProgress",
//   "discontinued",
//   "chevronButton",
//   "alertNotication",
//   "alert",
//   "calendarTime",
//   "calendar",
//   "chart",
//   "close",
//   "dots",
//   "download",
//   "edit",
//   "eyeOff",
//   "eye",
//   "filePdf",
//   "filters",
//   "information",
//   "minus",
//   "money",
//   "placeholder",
//   "plus",
//   "priceVariation",
//   "search",
//   "send",
//   "settings",
//   "trash",
//   "unarchive",
//   "upload",
//   "waiting",
// ];

export const Primary: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {IconNames.map((iconName: IconNameType) => (
        <div key={iconName} style={{ margin: "10px" }}>
          <Icon name={iconName} />
        </div>
      ))}
    </div>
  ),
};
