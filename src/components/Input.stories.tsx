import { useState } from "react";

import Input from "./Input";

export default { component: Input };

// const [value, setValue] = useState("");

export const Large = {
  args: {
    placeholder: "This is an input field that is quite long",
    label: "Field label",
    iconName: "file",
    size: "small",
    isError: true,
    // disabled: true,
    onChangeValue: (val: string) => console.log(val),
    value: "value",
  },
};
