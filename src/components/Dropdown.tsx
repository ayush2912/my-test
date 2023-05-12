import { useState } from "react";
import styled from "styled-components";

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
  background-color: white;
  border: 1px solid #ccc;
  color: #444;
  padding: 8px;
  font-size: 16px;
  cursor: pointer;
  width: 120px;
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

// Define the Dropdown component
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
      <DropdownButton onClick={toggleDropdown}>{value}</DropdownButton>
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
