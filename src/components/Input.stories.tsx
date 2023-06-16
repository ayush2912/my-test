import { useState } from "react";

import Input from "./Input";

export default { component: Input };

export const Large = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        label="Field label"
        iconName="file"
        onChangeValue={(val) => setValue(val)}
        value={value}
      />
    );
  },
};

export const LargeWithError = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        label="Field label"
        onChangeValue={(val) => setValue(val)}
        isError
        errorMessage="Invalid input text"
        value={value}
      />
    );
  },
};

export const LargeWithErrorWithIcon = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        label="Field label"
        iconName="file"
        onChangeValue={(val) => setValue(val)}
        isError
        errorMessage="Invalid input text"
        value={value}
      />
    );
  },
};

export const LargeDisabled = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        label="Field label"
        onChangeValue={(val) => setValue(val)}
        disabled
        value={value}
      />
    );
  },
};

export const LargeDisabledWithIcon = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        label="Field label"
        iconName="file"
        onChangeValue={(val) => setValue(val)}
        disabled
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
        onChangeValue={(val) => setValue(val)}
        value={value}
      />
    );
  },
};
export const LargeWithoutLabelWithIcon = {
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

export const LargeWithoutLabelError = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        onChangeValue={(val) => setValue(val)}
        isError
        errorMessage="Invalid input text"
        value={value}
      />
    );
  },
};
export const LargeWithoutLabelErrorWithIcon = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        iconName="file"
        onChangeValue={(val) => setValue(val)}
        isError
        errorMessage="Invalid input text"
        value={value}
      />
    );
  },
};
export const LargeWithoutLabelDisabled = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        onChangeValue={(val) => setValue(val)}
        disabled
        value={value}
      />
    );
  },
};

export const LargeWithoutLabelDisabledWithIcon = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        iconName="file"
        onChangeValue={(val) => setValue(val)}
        disabled
        value={value}
      />
    );
  },
};

export const Small = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        label="Field label"
        iconName="file"
        size="small"
        onChangeValue={(val) => setValue(val)}
        value={value}
      />
    );
  },
};

export const SmallWithError = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        label="Field label"
        onChangeValue={(val) => setValue(val)}
        isError
        errorMessage="Invalid input text"
        size="small"
        value={value}
      />
    );
  },
};

export const SmallWithErrorWithIcon = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        label="Field label"
        iconName="file"
        onChangeValue={(val) => setValue(val)}
        isError
        errorMessage="Invalid input text"
        size="small"
        value={value}
      />
    );
  },
};

export const SmallDisabled = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        label="Field label"
        onChangeValue={(val) => setValue(val)}
        disabled
        size="small"
        value={value}
      />
    );
  },
};

export const SmallDisabledWithIcon = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        label="Field label"
        iconName="file"
        onChangeValue={(val) => setValue(val)}
        disabled
        size="small"
        value={value}
      />
    );
  },
};
export const SmallWithoutLabel = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        onChangeValue={(val) => setValue(val)}
        size="small"
        value={value}
      />
    );
  },
};
export const SmallWithoutLabelWithIcon = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        iconName="file"
        onChangeValue={(val) => setValue(val)}
        size="small"
        value={value}
      />
    );
  },
};

export const SmallWithoutLabelError = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        onChangeValue={(val) => setValue(val)}
        size="small"
        isError
        errorMessage="Invalid input text"
        value={value}
      />
    );
  },
};
export const SmallWithoutLabelErrorWithIcon = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        iconName="file"
        onChangeValue={(val) => setValue(val)}
        size="small"
        isError
        errorMessage="Invalid input text"
        value={value}
      />
    );
  },
};
export const SmallWithoutLabelDisabled = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        onChangeValue={(val) => setValue(val)}
        size="small"
        disabled
        value={value}
      />
    );
  },
};

export const SmallWithoutLabelDisabledWithIcon = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Input
        placeholder="This is an input field that is quite long"
        iconName="file"
        onChangeValue={(val) => setValue(val)}
        size="small"
        disabled
        value={value}
      />
    );
  },
};
