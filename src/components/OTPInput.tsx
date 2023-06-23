import OtpInput from "react-otp-input";
import styled, { css } from "styled-components";

import Text from "./Text";

interface IOtpProps {
  isError: boolean;
  otp: string;
  setOtp: (val: string) => void;
}

const width = {
  width: "40px",
};

const Input = styled.input<{ isError: boolean }>`
  padding: 8px 12px;
  border-radius: 8px;
  border: ${(props) => `1px solid ${props.theme.colors.neutral[200]}`};
  width: 40px;
  height: 40px;
  font-size: 14px;
  font-family: "Open Sans";
  line-height: 24px;
  box-shadow: ${(props) => `10 0 0 10px ${props.theme.colors.primary[500]}`};

  ${(props) =>
    !props.isError &&
    css`
      &:hover {
        border: 2px solid ${props.theme.colors.neutral[400]};
      }
      &:focus {
        border: 2px solid ${props.theme.colors.primary[500]};
      }
    `}
  ${(props) =>
    props.isError &&
    css`
      border: 2px solid ${props.theme.colors.semantic.error.default};
      color: ${props.theme.colors.semantic.error.default};
    `};
`;

export default function OTPInput({ isError, otp, setOtp }: IOtpProps) {
  return (
    <>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        inputStyle={width}
        renderSeparator={<span style={{ width: "8px" }} />}
        renderInput={(props) => <Input isError={isError} {...props} />}
      />
      {isError && (
        <div style={{ marginTop: "8px" }}>
          <Text color="error" type="caption">
            Invalid authentication code. Please try again.
          </Text>
        </div>
      )}
    </>
  );
}
