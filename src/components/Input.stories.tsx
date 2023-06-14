import { useState } from "react";

import Input from "./Input";

export default { component: Input };

export const small = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        label="Field label"
        iconName="file"
        size="small"
        // isError={true}
        onChangeValue={(val) => setValue(val)}
        value={value}
      />
    );
  },
};

export const Large = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        label="Field label"
        iconName="file"
        // size="small"
        // isError={true}
        onChangeValue={(val) => setValue(val)}
        value={value}
      />
    );
  },
};

export const LargeWithoutLabel = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        iconName="file"
        onChangeValue={(val) => setValue(val)}
        value={value}
      />
    );
  },
};
