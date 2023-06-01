import { useState } from "react";
import styled from "styled-components";

import { TemporalView } from "./Calendar/Calendar.types";
import useGanttChartControls from "./useGanttChartControls";
import Button from "../Button";
import Dropdown from "../Dropdown";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 24px;
  gap: 16px;
`;
export const GanttChartControls = () => {
  const { view, changeView } = useGanttChartControls();

  const options = [
    { value: "monthly", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "yearly", label: "Monthly" },
  ];

  const handleDropdownChange = (value: string) => {
    changeView(value as TemporalView);
  };

  return (
    <ButtonContainer>
      <Button
        border="1px solid #E1E4E8"
        large={true}
        type="secondary"
        onClick={() => {
          console.log("focus today");
        }}
      >
        Today
      </Button>
      <Dropdown
        options={options}
        value={view}
        onChange={handleDropdownChange}
      />
    </ButtonContainer>
  );
};
