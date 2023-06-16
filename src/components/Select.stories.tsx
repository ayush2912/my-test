import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import Select from "./Select";
import Tooltip from "./Tooltip";

const meta: Meta<typeof Select> = {
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

const optionsLabelOnly = [
  { value: "value 1", label: "Renewable wind power project in India - 1-010" },
  { value: "value 2", label: "Renewable wind power project in India - 1-013" },
  { value: "value 3", label: "Renewable wind power project in India - 1-014" },
];

const optionsLabelOnlyMoreOptions = [
  { value: "value 1", label: "Renewable wind power project in India - 1-010" },
  { value: "value 2", label: "Renewable wind power project in India - 1-013" },
  { value: "value 3", label: "Renewable wind power project in India - 1-014" },
  { value: "value 4", label: "Renewable wind power project in India - 1-015" },
  { value: "value 5", label: "Renewable wind power project in India - 1-016" },
  { value: "value 6", label: "Renewable wind power project in India - 1-017" },
  { value: "value 7", label: "Renewable wind power project in India - 1-018" },
  { value: "value 8", label: "Renewable wind power project in India - 1-019" },
  { value: "value 9", label: "Renewable wind power project in India - 2-017" },
  { value: "value 10", label: "Renewable wind power project in India - 3-018" },
  { value: "value 11", label: "Renewable wind power project in India - -019" },
];

const optionsWithSubLabelOnly = [
  {
    value: "value 1",
    label: "Registration",
    sublabel: "(15 May 2022 - 13 Aug 2023)",
  },
  {
    value: "value 2",
    label: "Registration",
    sublabel: "(11 May 2022 - 11 Aug 2023)",
  },
  {
    value: "value 3",
    label: "Registration",
    sublabel: "(11 May 2023 - 11 Aug 2024)",
  },
];

const optionsWithSubLabelOnlyMoreOptions = [
  {
    value: "value 1",
    label: "Registration",
    sublabel: "(15 May 2022 - 13 Aug 2023)",
  },
  {
    value: "value 2",
    label: "Registration",
    sublabel: "(11 May 2022 - 11 Aug 2023)",
  },
  {
    value: "value 3",
    label: "Registration",
    sublabel: "(11 May 2023 - 11 Aug 2024)",
  },
  {
    value: "value 3",
    label: "Registration",
    sublabel: "(11 May 2025 - 11 Aug 2026)",
  },
  {
    value: "value 4",
    label: "Registration",
    sublabel: "(11 April 2020 - 11 Aug 2022)",
  },
  {
    value: "value 5",
    label: "Registration",
    sublabel: "(11 April 2026 - 11 Aug 2028)",
  },
  {
    value: "value 6",
    label: "Registration",
    sublabel: "(11 May 2025 - 11 Aug 2040)",
  },
  {
    value: "value 7",
    label: "Registration",
    sublabel: "(11 June 2021 - 11 Aug 2022)",
  },
  {
    value: "value 8",
    label: "Registration",
    sublabel: "(11 July 2026 - 11 Aug 2028)",
  },
];

export const Primary: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState("value 1");
    return (
      <Select
        isPrimary={true}
        options={optionsLabelOnly}
        placeholder="Placeholder"
        onSelect={(val) => setSelectedOption(val)}
        selected={selectedOption}
      />
    );
  },
};
export const PrimaryWithMoreOptions: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState("value 1");
    return (
      <Select
        isPrimary={true}
        options={optionsLabelOnlyMoreOptions}
        placeholder="Placeholder"
        onSelect={(val) => setSelectedOption(val)}
        selected={selectedOption}
      />
    );
  },
};
export const PrimaryWithSubLabel: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState("value 1");
    return (
      <Select
        isPrimary={true}
        options={optionsWithSubLabelOnly}
        placeholder="Placeholder"
        onSelect={(val) => setSelectedOption(val)}
        selected={selectedOption}
      />
    );
  },
};
export const PrimaryWithSubLabelMoreOptions: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState("value 1");
    return (
      <Select
        isPrimary={true}
        options={optionsWithSubLabelOnlyMoreOptions}
        placeholder="Placeholder"
        onSelect={(val) => setSelectedOption(val)}
        selected={selectedOption}
      />
    );
  },
};
export const PrimaryElipsis: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState("value 1");
    return (
      <div style={{ width: "30%" }}>
        <Select
          isPrimary={true}
          options={optionsLabelOnly}
          placeholder="Placeholder"
          onSelect={(val) => setSelectedOption(val)}
          selected={selectedOption}
        />
      </div>
    );
  },
};

export const Secondary: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState("value 1");
    return (
      <Select
        isPrimary={false}
        options={optionsLabelOnly}
        placeholder="Placeholder"
        onSelect={(val) => setSelectedOption(val)}
        selected={selectedOption}
      />
    );
  },
};
export const SecondaryWithMoreOptions: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState("value 1");
    return (
      <Select
        isPrimary={false}
        options={optionsLabelOnlyMoreOptions}
        placeholder="Placeholder"
        onSelect={(val) => setSelectedOption(val)}
        selected={selectedOption}
      />
    );
  },
};
export const SecondaryWithSubLabel: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState("value 1");
    return (
      <Select
        isPrimary={false}
        options={optionsWithSubLabelOnly}
        placeholder="Placeholder"
        onSelect={(val) => setSelectedOption(val)}
        selected={selectedOption}
      />
    );
  },
};
export const SecondaryWithSubLabelMoreOptions: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState("value 1");
    return (
      <Select
        isPrimary={false}
        options={optionsWithSubLabelOnlyMoreOptions}
        placeholder="Placeholder"
        onSelect={(val) => setSelectedOption(val)}
        selected={selectedOption}
      />
    );
  },
};

export const SecondaryElipsis: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState("value 1");
    return (
      <div style={{ width: "30%" }}>
        <Select
          options={optionsLabelOnly}
          placeholder="Placeholder"
          onSelect={(val) => setSelectedOption(val)}
          selected={selectedOption}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Select
      disabled={true}
      isPrimary={false}
      options={optionsLabelOnly}
      selected={"value 1"}
      placeholder="Placeholder"
      onSelect={(val) => console.log(val)}
    />
  ),
};

export const DisabledWithToolTip: Story = {
  render: () => (
    <div style={{ width: "50%", marginTop: "50px" }}>
      <Tooltip position="right" text={"Select a project to view engagements"}>
        <Select
          disabled={true}
          isPrimary={false}
          options={optionsLabelOnly}
          selected={"value 1"}
          placeholder="Placeholder"
          onSelect={(val) => console.log(val)}
        />
      </Tooltip>
    </div>
  ),
};
