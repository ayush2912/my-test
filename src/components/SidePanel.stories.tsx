import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

import Button from "./Button";
import { SidePanel } from "./SidePanel";

export default {
  component: SidePanel,
} as Meta;

const Template: StoryFn = () => {
  const [showSidePanel, setShowSidePanel] = useState(false);

  const onClose = () => {
    setShowSidePanel(false);
  };
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setShowSidePanel(true);
        }}
      >
        Open Side Panel
      </Button>
      <SidePanel isOn={showSidePanel} onClose={onClose}>
        <div style={{ textAlign: "center" }}>
          <h2>You can put your page here</h2>
          <Button
            type="secondary"
            onClick={() => {
              setShowSidePanel(false);
            }}
          >
            Close
          </Button>
        </div>
      </SidePanel>
    </>
  );
};
export const Default = Template.bind({});
Default.args = {};
