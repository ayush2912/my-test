import { useRef, useState } from "react";
import styled from "styled-components";

import { useOutsideAlerter } from "./../hooks/useOutsideAlerter";
import Icon from "./Icon";
import Text from "./Text";

const Selected = styled.div<{ isPrimary: boolean }>`
  height: 40px;
  display: flex;
  cursor: default;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 8px 8px 8px 16px;

  background: ${(props) => (props.isPrimary ? "#d8e4fc" : "#FFFFFF")};
  border: 1px solid ${(props) => (props.isPrimary ? "#3c76f1" : "#E1E4E8")};
`;

const OptionsCard = styled.div`
  left: 0;
  top: 100%;
  z-index: 10;
  width: 100%;
  margin-top: 4px;
  overflow-x: auto;
  padding: 8px 16px;
  max-height: 352px;
  position: absolute;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 8px 24px -6px rgba(0, 0, 0, 0.16),
    0px 0px 1px rgba(0, 0, 0, 0.4);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #c4c9d1;
    border-radius: 16px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #b1b6bd;
  }
`;

const Options = styled.ul`
  gap: 4px;
  width: 100%;
  display: flex;
  background: #ffffff;
  flex-direction: column;
  align-items: flex-start;

  li {
    width: 100%;
    padding: 8px;
    display: flex;
    cursor: pointer;
    border-radius: 8px;
    align-items: flex-start;
  }
  li:hover {
    background: #eff4fe;
  }
`;

const TextHolder = styled.div`
  gap: 9px;
  display: flex;
  align-items: center;

  //   text
  span {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    white-space: pre-wrap;
    -webkit-box-orient: vertical;
  }
`;

export interface ISelectOption {
  value: string;
  sublabel?: string;
  label: string;
}

const Select = ({
  options = [],
  onSelect,
  selected,
  isPrimary,
  placeholder,
}: {
  isPrimary?: boolean;
  selected: string;
  options?: ISelectOption[];
  placeholder?: string;
  onSelect: (value: string) => void;
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const selectorRef = useRef(null);
  useOutsideAlerter(selectorRef, () => {
    if (showOptions) setShowOptions(false);
  });
  const onOptionSelect = (selectedValue: string) => {
    onSelect(selectedValue);
    setShowOptions(false);
  };

  const selectedOption =
    options?.find((v) => v.value === selected) || options[0];

  return (
    <div ref={selectorRef} style={{ position: "relative", width: "100%" }}>
      <Selected
        isPrimary={Boolean(isPrimary)}
        onClick={() => setShowOptions(!showOptions)}
      >
        {selected ? (
          <TextHolder>
            <Text color={isPrimary ? "primary" : "default"} type="button">
              {selectedOption?.label}
            </Text>
            <Text color="subdued" type="caption">
              {selectedOption?.sublabel}
            </Text>
          </TextHolder>
        ) : (
          <Text color="subdued" type="body">
            {placeholder}
          </Text>
        )}

        <Icon
          name={showOptions ? "chevronUp" : "chevronDown"}
          size="small"
          strokeColor={isPrimary ? "#3C76F1" : "#8992A3"}
        />
      </Selected>

      {showOptions && (
        <OptionsCard>
          {options && (
            <Options>
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => onOptionSelect(option.value)}
                >
                  <TextHolder>
                    <Text color="default" type="body">
                      {option?.label}
                    </Text>
                    <Text color="subdued" type="caption">
                      {option?.sublabel}
                    </Text>
                  </TextHolder>
                </li>
              ))}
            </Options>
          )}
        </OptionsCard>
      )}
    </div>
  );
};

export default Select;
