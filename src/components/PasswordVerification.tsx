import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Input from "./Input";

export default function PasswordVerificationInput() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const click = () => {
    console.log(getValues("password"), errors);
    setShowPassword(!showPassword);
  };

  return (
    <Input
      iconName={showPassword ? "eyeIcon" : "eyeOff"}
      type={showPassword ? "text" : "password"}
      placeholder="Enter Password"
      onIconClick={() => click()}
      formFieldName="password"
      register={register}
      requiredObject={{
        required: "warning",
        maxLength: {
          value: 8,
          message: "Too Many Characters",
        },
        message: "well shit",
      }}
    />
  );
}
