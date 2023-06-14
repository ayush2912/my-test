import { useState } from "react";
import styled, { css } from "styled-components";

import Icon, { IconNameType } from "./Icon";
import Text from "./Text";

interface IIinputProps {
  size?: string;
  label?: string;
  isError?: boolean;
  disabled?: boolean;
  placeholder: string;
  iconName?: IconNameType;
  value?: string | number;
  onChangeValue: (val: string | number) => void;
}

const InputContainer = styled.div<{
  size?: string;
  isError?: boolean;
  isFocused: boolean;
  disabled?: boolean;
}>`
  gap: 14px;
  display: flex;
  border-radius: 8px;
  align-items: center;
  height: ${(props) => (props?.size === "small" ? "32px;" : "40px;")} 
  padding: ${(props) => (props?.size === "small" ? "4px 12px;" : "8px 12px;")} 
  
  border:${(props) =>
    props.isFocused ? "2px solid #3C76F1" : "1px solid #c4c9d1"};
  border:${(props) => props.isError && "2px solid #FF647C"};
  border:${(props) => props.disabled && "none"};
  
  ${(props) =>
    props?.disabled &&
    css`
      background-color: #f1f2f4;
    `};

  ${(props) =>
    !props.disabled &&
    !props.isError &&
    css`
      &:hover {
        border: ${props.isFocused ? "2px solid #3C76F1" : "2px solid #8992A3"};
      }
    `}
  


  input {
    font-family: "Open Sans";
    font-style: normal;
    line-height: 24px;
    font-weight: 400;
    font-size: 14px;
    outline: none;
    border: none;
    height: 100%;
    width: 100%;
    focus: none;

    ::placeholder {
      color: #8992a3;
      opacity: 1;
    }
  }
`;

const ErrorMessage = styled.div`
  align-content: center;
  margin-top: 4px;
  display: flex;
  gap: 4px;
`;

export default function Input({
  size,
  value,
  label,
  isError,
  disabled,
  iconName,
  placeholder,
  onChangeValue,
}: IIinputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      {label && (
        <div style={{ marginBottom: "8px" }}>
          <Text type="captionBold" color="subdued">
            {label}
          </Text>
        </div>
      )}

      <InputContainer
        isFocused={isFocused}
        disabled={disabled}
        isError={isError}
        size={size}
      >
        <input
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => onChangeValue(e.target.value)}
        />
        {iconName && (
          <Icon name={iconName} size={size === "small" ? "xsmall" : "small"} />
        )}
      </InputContainer>

      {!disabled && isError && (
        <ErrorMessage>
          <Icon name="information" size="xsmall" strokeColor="#FF647C" />

          <Text type="caption" color="error">
            Invalid text input
          </Text>
        </ErrorMessage>
      )}
    </>
  );
}
