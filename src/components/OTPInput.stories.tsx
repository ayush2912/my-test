import { useState } from "react";

import OTPInput from "./OTPInput";
import Text from "./Text";

export default { component: OTPInput };

export const DefaultOtpInput = {
  render: () => {
    const [otp, setOtp] = useState("");
    return (
      <>
        <OTPInput
          isError={otp.length === 6 && otp !== "123456"}
          setOtp={(val: string) => setOtp(val)}
          otp={otp}
        />
        {otp === "123456" && (
          <Text color="success" type="caption">
            Otp Verified
          </Text>
        )}
      </>
    );
  },
};

export const ErrorOtpInput = {
  render: () => {
    const [otp, setOtp] = useState("123456");
    return (
      <OTPInput
        isError={true}
        setOtp={(val: string) => setOtp(val)}
        otp={otp}
      />
    );
  },
};
