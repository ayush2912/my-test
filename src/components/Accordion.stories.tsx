import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

import Accordion from "./Accordion";
import Text from "./Text";

const meta: Meta<typeof Accordion> = {
  title: "Accordion",
  component: Accordion,
};

export default meta;

export const Primary: StoryFn = () => {
  const [openAccordion, setOpenAccordion] = useState(false);

  const toggleAccordion = () => {
    setOpenAccordion(!openAccordion);
  };
  return (
    <Accordion
      title="I am Header"
      isOpen={openAccordion}
      toggleAccordion={toggleAccordion}
    >
      <Text type="body" color="default">
        {"I am the content of this accordion"}
      </Text>
    </Accordion>
  );
};
