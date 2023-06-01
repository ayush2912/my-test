import { useState } from "react";
import styled from "styled-components";

import { TemporalView } from "./Calendar/Calendar.types";
import GanttChartLengend from "./GanttChartLegend";
import useGanttChartControls from "./useGanttChartControls";
import Button from "../Button";
import Dropdown from "../Dropdown";
import Select from "../Select";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: fit;
  margin-bottom: 24px;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;

const SelectBox = styled.div`
  width: 383px;
`;

const DropDownBox = styled.div`
  width: 121px;
`;
export const GanttChartControls = ({
  onTodayButtonClick,
}: {
  onTodayButtonClick: () => void;
}) => {
  const { view, changeView } = useGanttChartControls();

  const options = [
    { value: "monthly", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "yearly", label: "Monthly" },
  ];

  const selectOptions = [
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
  ];

  const handleDropdownChange = (value: string) => {
    changeView(value as TemporalView);
  };

  return (
    <ButtonContainer>
      <div>
        <SelectBox>
          <Select
            isPrimary={false}
            options={selectOptions}
            placeholder="Select Engagement Type"
            onSelect={(value) => console.log(value)}
          />
        </SelectBox>
        <GanttChartLengend />
      </div>

      <div>
        <Button
          border="1px solid #E1E4E8"
          large={true}
          type="secondary"
          onClick={onTodayButtonClick}
        >
          Today
        </Button>

        <DropDownBox>
          <Dropdown
            options={options}
            value={view}
            onChange={handleDropdownChange}
          />
        </DropDownBox>
      </div>
    </ButtonContainer>
  );
};
