import { FunctionComponent, ReactNode, useState } from "react";
import styled from "styled-components";

import Icon from "./Icon";
import Text from "./Text";

interface AccordionProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  toggleAccordion: () => void;
}

// Styled Components
const AccordionContainer = styled.div`
  border-top: 1px solid #e1e4e8;
  // border-bottom: 1px solid #e1e4e8;
  // margin-bottom: 10px;
`;

const ChevronButtonIconWrapper = styled.div<{ isOpen: boolean }>`
  width: 24px;
  height: 24px;
  transform: ${(props) => (props.isOpen ? `rotate(180deg)` : "")};
  cursor: pointer;
`;

const AccordionHeader = styled.div`
  background-color: #fff;
  padding: 18px 18px 18px 8px;
  color: #363c46;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const AccordionContent = styled.div`
  padding: 18px 18px 18px 8px;
  display: block;
`;

// Accordion Component
const Accordion: FunctionComponent<AccordionProps> = ({
  title,
  children,
  isOpen,
  toggleAccordion,
}) => {
  return (
    <AccordionContainer>
      <AccordionHeader>
        <Text type="bodyBold" color="default">
          {title}
        </Text>
        <ChevronButtonIconWrapper isOpen={isOpen} onClick={toggleAccordion}>
          <Icon name="chevronButton" />
        </ChevronButtonIconWrapper>
      </AccordionHeader>
      {isOpen ? <AccordionContent>{children}</AccordionContent> : null}
    </AccordionContainer>
  );
};

export default Accordion;
