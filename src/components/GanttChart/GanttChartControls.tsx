import styled from "styled-components";

import { TemporalView } from "./Calendar/Calendar.types";
import GanttChartLengend from "./GanttChartLegend";
import useGanttChartControls from "./useGanttChartControls";
import Button from "../Button";
import Dropdown from "../Dropdown";
import Icon from "../Icon";
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
  selectedEngagementId,
  engagementOptions,
  onSelectEngagement,
  onTodayButtonClick,
}: {
  selectedEngagementId: string;
  engagementOptions: { label: string; value: string }[];
  onSelectEngagement: (engagementId: string) => void;
  onTodayButtonClick: () => void;
}) => {
  const { view, changeView, temporalViewOptions } = useGanttChartControls();

  const handleDropdownChange = (value: string) => {
    changeView(value as TemporalView);
  };

  return (
    <ButtonContainer>
      <div>
        <SelectBox>
          <Select
            selected={selectedEngagementId}
            isPrimary={false}
            options={engagementOptions}
            placeholder="Select an engagement"
            onSelect={onSelectEngagement}
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

        <Button
          size="large"
          type="secondary"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
          }}
          isIconButton
          lightBorderColor
        >
          <Icon name="linkCopy" />
        </Button>
      </div>
    </ButtonContainer>
  );
};
