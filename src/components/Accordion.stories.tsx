import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import styled from "styled-components";

import Accordion from "./Accordion";
import Text from "./Text";

const meta: Meta<typeof Accordion> = {
  title: "Accordion",
  component: Accordion,
};

export default meta;

const StyledHr = styled.hr`
  border: none;
  height: 1px;
  background-color: #e1e4e8;
`;

export const Single: StoryFn = () => {
  const [openAccordion, setOpenAccordion] = useState(false);

  const toggleAccordion = () => {
    setOpenAccordion(!openAccordion);
  };
  return (
    <>
      <Accordion
        title="I am Header"
        isOpen={openAccordion}
        toggleAccordion={toggleAccordion}
      >
        <Text type="body" color="default">
          {"I am the content of this accordion"}
        </Text>
      </Accordion>
      {!openAccordion ? <StyledHr /> : null}
    </>
  );
};

export const Multiple: StoryFn = () => {
  const [openFirstAccordion, setOpenFirstAccordion] = useState(false);

  const [openSecondAccordion, setOpenSecondAccordion] = useState(false);

  const toggleFirstAccordion = () => {
    setOpenFirstAccordion(!openFirstAccordion);
    setOpenSecondAccordion(false);
  };

  const toggleSecondAccordion = () => {
    setOpenSecondAccordion(!openSecondAccordion);
    setOpenFirstAccordion(false);
  };

  return (
    <>
      <Accordion
        title="I am First Header"
        isOpen={openFirstAccordion}
        toggleAccordion={toggleFirstAccordion}
      >
        <Text type="body" color="default">
          {"I am the content of this accordion"}
        </Text>
      </Accordion>

      <Accordion
        title="I am Second Header"
        isOpen={openSecondAccordion}
        toggleAccordion={toggleSecondAccordion}
      >
        <Text type="body" color="default">
          {"I am the content of this accordion"}
        </Text>
      </Accordion>

      {!openSecondAccordion ? <StyledHr /> : null}
    </>
  );
};
