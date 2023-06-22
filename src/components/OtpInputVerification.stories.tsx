import { useState, useEffect } from "react";

import OtpInputVerification from "./OtpInputVerification";
import Text from "./Text";

export default { component: OtpInputVerification };

export const DefaultOtpInput = {
  render: () => {
    const [otp, setOtp] = useState("");
    useEffect(() => {
      alert("your otp is 123456");
    }, []);

    return (
      <>
        <OtpInputVerification
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
      <OtpInputVerification
        isError={true}
        setOtp={(val: string) => setOtp(val)}
        otp={otp}
      />
    );
  },
};
