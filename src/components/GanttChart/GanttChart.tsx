import styled from "styled-components";

import { EngagementBar } from "./Bar/EngagementBar";
import { ProjectBar } from "./Bar/ProjectBar";
import { TaskBar } from "./Bar/TaskBar";
import { ICalendar, TemporalView } from "./Calendar/Calendar.type";
import { CalendarBackground } from "./Calendar/CalendarBackground";
import { CalendarHeader } from "./Calendar/CalendarHeader";
import { IMappedEngagements } from "./GanttChart.types";
import Card from "../Card";
// import Dropdown from "../Dropdown";

const StyledCalendarContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding-top: 24px;
  border-top: 1px solid #e1e4e8;
  overflow-x: scroll;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 24px;
`;

export const GanttChart = ({
  mappedProjectEngagements,
  calendar,
  selectedView = "monthly",
}: {
  mappedProjectEngagements: IMappedEngagements;
  calendar: ICalendar;
  selectedView: TemporalView;
}) => {
  // const [selectedOption, setSelectedOption] = useState<TemporalView>("monthly");

  // const options = [
  //   { value: "monthly", label: "monthly" },
  //   { value: "yearly", label: "yearly" },
  //   { value: "weekly", label: "weekly" },
  // ];

  // const handleDropdownChange = (value: "yearly" | "monthly" | "weekly") => {
  //   setSelectedOption(value);
  // };

  return (
    <Card width={1280}>
      {/* <ButtonContainer>
        <Dropdown
          options={options}
          value={selectedOption}
          onChange={handleDropdownChange}
        />
      </ButtonContainer> */}
      <StyledCalendarContainer>
        <CalendarHeader calendarHeader={calendar.header} view={selectedView} />
        <CalendarBackground
          width={calendar.width[selectedView]}
          view={selectedView}
        >
          {mappedProjectEngagements.map((v) => {
            return (
              <div key={v.id}>
                <ProjectBar key={v.id + "p"} projectData={v.project} />
                <EngagementBar key={v.id + "e"} engagementData={v} />
                {v.tasks.map((v) => (
                  <TaskBar key={v.id} taskData={v} />
                ))}
              </div>
            );
          })}
        </CalendarBackground>
      </StyledCalendarContainer>
    </Card>
  );
};
