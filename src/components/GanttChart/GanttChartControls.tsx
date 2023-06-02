import { useState } from "react";
import styled from "styled-components";

import { TemporalView } from "./Calendar/Calendar.types";
import GanttChartLengend from "./GanttChartLegend";
import useGanttChartControls from "./useGanttChartControls";
import Button from "../Button";
import Dropdown from "../Dropdown";
import Select from "../Select";
import Text from "../Text";

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
    {
      value: "value 1",
      displayValue: "Feasibility study",
      subValue: "(14 May 2023 - 16 Apr 2024)",
    },
    {
      value: "value 2",
      displayValue: "Registration",
      subValue: "(14 Sep 2023 - 16 Mar 2024)",
    },
    {
      value: "long value",
      displayValue: "Issuance",
      subValue: "(26 Oct 2023- 16 Apr 2024)",
    },
    {
      value: "long value",
      displayValue: "Issuance",
      subValue: "(14 Nov 2023- 15 May 2024)",
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
          <Text color="default" type="button">
            Today
          </Text>
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
