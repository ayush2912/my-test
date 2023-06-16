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
  const {
    view,
    changeView,
    temporalViewOptions,
    engagementOptions,
    selectedEngagement,
    setSelectedEngagement,
  } = useGanttChartControls();

  const handleDropdownChange = (value: string) => {
    changeView(value as TemporalView);
  };

  const handleSelectEngagement = (engagementId: string) => {
    setSelectedEngagement(engagementId);
  };

  return (
    <ButtonContainer>
      <div>
        <SelectBox>
          <Select
            selected={selectedEngagement.id}
            isPrimary={false}
            options={engagementOptions}
            placeholder="Select an engagement"
            onSelect={handleSelectEngagement}
          />
        </SelectBox>
        <GanttChartLengend />
      </div>

      <div>
        <Button
          lightBorderColor
          type="secondary"
          size="large"
          onClick={onTodayButtonClick}
        >
          Today
        </Button>

        <DropDownBox>
          <Dropdown
            options={temporalViewOptions}
            value={view}
            onChange={handleDropdownChange}
          />
        </DropDownBox>
      </div>
    </ButtonContainer>
  );
};
