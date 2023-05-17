import { useState } from "react";
import styled from "styled-components";

import Icon from "./Icon";
import Text from "./Text";

// Define the type for the options
interface Option {
  value: string;
  label: string;
}

// Define the type for the props
interface DropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

// Define the styled components
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #ccc;
  border-color: ${(prop) => prop.theme.colors.neutral[700]};
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  width: 120px;
  text-align: left;

  &:hover {
    background-color: ${(props) => props.theme.colors.neutral[200]};
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;

  background: #ffffff;
  /* Shadow Card */

  box-shadow: 0px 8px 64px rgba(15, 34, 67, 0.06),
    0px 0px 1px rgba(15, 34, 67, 0.08);
  border-radius: 8px;
  padding: 0;
  margin: 0;
  list-style: none;
  font-size: 16px;
  margin-top: 3px;
`;

const DropdownListItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  width: 120px;
  &:hover {
    background: #eff4fe;
  }
`;

const Dropdown = ({ options, value, onChange }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    setIsOpen(false);
    onChange(option.value);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        <Text type="button">
          {options.find((v: any) => v.value === value)?.label}
        </Text>
        <Icon name="chevronDown" size="big" />
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {options.map((option: any) => (
            <DropdownListItem
              key={option.value}
              onClick={() => handleOptionClick(option)}
            >
              <Text type="body">{option.label}</Text>
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
