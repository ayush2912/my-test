import { useState } from "react";
import styled from "styled-components";

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
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  background-color: white;
  border: 1px solid #ccc;
  padding: 0;
  margin: 0;
  list-style: none;
  font-size: 16px;
`;

const DropdownListItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f6f6f6;
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
          {options.map((option) => (
            <DropdownListItem
              key={option.value}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
