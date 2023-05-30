import { useState } from "react";
import styled from "styled-components";

import Text from "./Text";

const Selected = styled.div<{ isPrimary: boolean }>`
  height: 40px;
  display: flex;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  justify-content: left;
  padding: 8px 8px 8px 16px;

  background: ${(props) => (props.isPrimary ? "#d8e4fc" : "#FFFFFF")};
  border: 1px solid ${(props) => (props.isPrimary ? "#3c76f1" : "#E1E4E8")};
`;

const Options = styled.ul`
  gap: 4px;
  width: 100%;
  display: flex;
  margin-top: 4px;
  padding: 8px 4px;
  position: absolute;
  background: #ffffff;
  border-radius: 12px;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0px 8px 24px -6px rgba(0, 0, 0, 0.16),
    0px 0px 1px rgba(0, 0, 0, 0.4);

  li {
    width: 100%;
    padding: 8px;
    display: flex;
    border-radius: 8px;
    align-items: flex-start;
  }
  li:hover {
    background: #eff4fe;
  }
`;

interface Ioption {
  value: string | number;
  displayValue: string | number;
}

const Select = ({
  options,
  selected,
  isPrimary,
  placeholder,
}: {
  options?: Ioption[];
  isPrimary: boolean;
  selected?: Ioption;
  placeholder?: string;
}) => {
  const [selectedOption, setSelected] = useState(selected);

  return (
    <div style={{ position: "relative" }}>
      <Selected isPrimary={isPrimary}>
        {selectedOption ? (
          <Text color={isPrimary ? "primary" : "default"} type="button">
            {selected?.displayValue}
          </Text>
        ) : (
          <Text color="subdued" type="body">
            {placeholder}
          </Text>
        )}
      </Selected>

      <Options>
        <li>item 1</li>
        <li>item 2</li>
      </Options>
    </div>
  );
};

export default Select;
