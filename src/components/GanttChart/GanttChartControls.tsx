import styled from "styled-components";

import { TemporalView } from "./Calendar/Calendar.types";
import GanttChartLengend from "./GanttChartLegend";
import useGanttChartControls from "./useGanttChartControls";
import Button from "../Button";
import Dropdown from "../Dropdown";
import Icon from "../Icon";
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
            options={temporalViewOptions}
            value={view}
            onChange={handleDropdownChange}
          />
        </DropDownBox>

        <Button
          border="1px solid #E1E4E8"
          large={true}
          type="secondary"
          onClick={() => {
            console.log("hello");
          }}
          isIcon
        >
          <Icon name="linkCopy" />
        </Button>
      </div>
    </ButtonContainer>
  );
};
