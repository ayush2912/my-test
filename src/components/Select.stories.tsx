import type { Meta, StoryObj } from "@storybook/react";

import Select from "./Select";

const meta: Meta<typeof Select> = {
  title: "Select",
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: "value 1", label: "Display Value" },
  {
    value: "value 2",
    label: "Value with sub value",
    sublabel: "(sub value)",
  },
  {
    value: "long value",
    label:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    value: "value 3",
    label: "Value with sub value",
    sublabel: "(sub value)",
  },
  {
    value: "value 4",
    label: "Value with sub value",
    sublabel: "(sub value)",
  },
  {
    value: "value 5",
    label: "Value with sub value",
    sublabel: "(sub value)",
  },
  {
    value: "value 6",
    label: "Value with sub value",
    sublabel: "(sub value)",
  },
  {
    value: "value 7",
    label: "Value with sub value",
    sublabel: "(sub value)",
  },
  {
    value: "value 8",
    label: "Value with sub value",
    sublabel: "(sub value)",
  },
];

const options2 = [
  { value: "value 1", label: "Display Value" },
  {
    value: "value 2",
    label: "Value with sub value",
    sublabel: "(sub value)",
  },
];
export const Primary: Story = {
  render: () => (
    <Select
      isPrimary={true}
      options={options}
      placeholder="Placeholder"
      onSelect={(val) => console.log(val)}
      selected={"value 1"}
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
        selected={"value 1"}
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
      selected={"value 1"}
      placeholder="Placeholder"
      onSelect={(val) => console.log(val)}
    />
  ),
};
