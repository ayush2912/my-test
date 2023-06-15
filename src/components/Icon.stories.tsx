import type { Meta, StoryObj } from "@storybook/react";

import Icon, { IconNameType, IconNames } from "./Icon";

const meta: Meta<typeof Icon> = {
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

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
