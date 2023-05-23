import { Meta, StoryFn } from "@storybook/react";

import { Overlay } from "./Overlay";

export default {
  title: "Overlay",
  component: Overlay,
} as Meta;

const Template: StoryFn = () => {
  return <Overlay isOpen />;
};
export const Default = Template.bind({});
Default.args = {};