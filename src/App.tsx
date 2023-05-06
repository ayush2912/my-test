import styled, { ThemeProvider } from "styled-components";

import "./App.css";
import { Text } from "./components";
import { CalendarHeader } from "./components/CalendarHeader";
import { calendarDetailsMock } from "./components/calendarMockData";
import { GanttChartBar } from "./components/GanttChartBar";
import { theme } from "./styles/theme";
const StyledBody = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width}px;
  height: 600px;
  border: 1px solid #f1f2f4;
  background-color: #ffffff;
  background-image: linear-gradient(
      to right,
      rgba(225, 228, 232, 0.5) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, transparent 40px, rgba(241, 242, 244, 0.5) 1px);

  background-size: 40px 80px;
`;

const StyledCalendarContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding-top: 24px;
  border-top: 1px solid #e1e4e8;
  overflow-x: scroll;
`;

const BarContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 8px 0px;
`;

const Bar = styled.div<{ barWidth: number; offsetFromLeft: number }>`
  display: flex;
  align-items: center;
  height: 24px;
  width: ${({ barWidth }) => barWidth}px;
  border-radius: 4px;
  margin-left: ${({ offsetFromLeft }) => offsetFromLeft}px;
  cursor: pointer;
`;

const TaskBar = styled(Bar)`
  justify-content: center;
  border: 2px solid #8aadf7;
  background-color: #8aadf7;
  overflow: hidden;
`;

const EngagementBar = styled(Bar)`
  justify-content: center;
  background-color: ${(props) => props.theme.colors.primary[600]};
`;

const ProjectBar = styled(Bar)`
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: "1280px" }}>
        <StyledCalendarContainer>
          <CalendarHeader range={calendarDetailsMock.range} />
          <StyledBody width={Number(calendarDetailsMock.duration.DAILY * 40)}>
            <GanttChartBar barWidth={500} offsetFromLeft={100} type="project" />
            <GanttChartBar
              barWidth={200}
              offsetFromLeft={100}
              type="engagement"
            />
            <GanttChartBar barWidth={200} offsetFromLeft={100} type="task" />
          </StyledBody>
        </StyledCalendarContainer>
      </div>
    </ThemeProvider>
  );
}

export default App;
