import type { Meta, StoryObj } from "@storybook/react";

import Select from "./Select";

const meta: Meta<typeof Select> = {
  title: "Select",
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: "value 1", displayValue: "Display Value" },
  {
    value: "value 2",
    displayValue: "Value with sub value",
    subValue: "(sub value)",
  },
  {
    value: "long value",
    displayValue:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    value: "value 3",
    displayValue: "Value with sub value",
    subValue: "(sub value)",
  },
  {
    value: "value 4",
    displayValue: "Value with sub value",
    subValue: "(sub value)",
  },
  {
    value: "value 5",
    displayValue: "Value with sub value",
    subValue: "(sub value)",
  },
  {
    value: "value 6",
    displayValue: "Value with sub value",
    subValue: "(sub value)",
  },
  {
    value: "value 7",
    displayValue: "Value with sub value",
    subValue: "(sub value)",
  },
  {
    value: "value 8",
    displayValue: "Value with sub value",
    subValue: "(sub value)",
  },
];

const options2 = [
  { value: "value 1", displayValue: "Display Value" },
  {
    value: "value 2",
    displayValue: "Value with sub value",
    subValue: "(sub value)",
  },
];
export const Primary: Story = {
  render: () => (
    <Select
      isPrimary={true}
      options={options}
      placeholder="Placeholder"
      onSelect={(val) => console.log(val)}
      selected={{ value: "SelecteValue", label: "Display Value" }}
    />
  ),
};

export const Secondary: Story = {
  render: () => (
    <>
      <Select
        options={options}
        isPrimary={false}
        placeholder="Placeholder"
        selected={{
          value: "SelecteValue",
          label: "Display Value",
          sublabel: "(sub value)",
        }}
        onSelect={(val) => console.log(val)}
      />
      <div>hello</div>
    </>
  ),
};

export const LessOptions: Story = {
  render: () => (
    <Select
      isPrimary={false}
      options={options2}
      placeholder="Placeholder"
      onSelect={(val) => console.log(val)}
    />
  ),
};
