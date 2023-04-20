import type { Meta, StoryObj } from "@storybook/react";

import Text from "./Text";

const meta: Meta<typeof Text> = {
  title: "Text",
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Typography: Story = {
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "500px",
        }}
      >
        <Text type="heading1">Heading 1</Text>
        <Text type="heading2">Heading 2</Text>
        <Text type="heading3">Heading 3</Text>
        <Text type="button">Button </Text>
        <Text type="body">Body</Text>
        <Text type="bodyBold">Body Bold</Text>
        <Text type="caption">Caption</Text>
        <Text type="captionBold">Caption Bold</Text>
        <Text type="smallText">Small Text</Text>
        <Text type="smallTextBold">Small Text Bold</Text>
        <Text type="linkText">Link Text</Text>
        <Text type="linkTextBold">Link Text Bold</Text>
      </div>
    );
  },
};
