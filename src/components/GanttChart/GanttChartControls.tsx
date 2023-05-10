import { useState } from "react";
import styled from "styled-components";

import { TemporalView } from "./Calendar/Calendar.type";
import useGanttChartControls from "./useGanttChartControls";
import Dropdown from "../Dropdown";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 24px;
`;
export const GanttChartControls = () => {
  const { view, changeView } = useGanttChartControls();

  const options = [
    { value: "monthly", label: "monthly" },
    { value: "yearly", label: "yearly" },
    { value: "weekly", label: "weekly" },
  ];

  const handleDropdownChange = (value: TemporalView) => {
    changeView(value);
  };

  return (
    <ButtonContainer>
      <Dropdown
        options={options}
        value={view}
        onChange={handleDropdownChange}
      />
    </ButtonContainer>
  );
};
