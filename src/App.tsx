import styled, { ThemeProvider } from "styled-components";

import "./App.css";
import { Text } from "./components";
import { CalendarHeader } from "./components/CalendarHeader";
import { calendarDetailsMock } from "./components/calendarMockData";
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

const TaskBar = styled.div<{ barWidth: number; offsetFromLeft: number }>`
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: ${({ barWidth }) => barWidth}px;
  border: 2px solid #8aadf7;
  background-color: #8aadf7;
  border-radius: 4px;
  overflow: hidden;
  margin-left: ${({ offsetFromLeft }) => offsetFromLeft}px;
`;

const EngagementBar = styled.div<{ barWidth: number; offsetFromLeft: number }>`
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: ${({ barWidth }) => barWidth}px;
  background-color: ${(props) => props.theme.colors.primary[600]};
  border-radius: 4px;
  overflow: hidden;
  margin-left: ${({ offsetFromLeft }) => offsetFromLeft}px;
`;

const ProjectBar = styled.div<{ barWidth: number; offsetFromLeft: number }>`
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: ${({ barWidth }) => barWidth}px;
  border: 2px solid #8aadf7;
  background-color: transparent;
  border-radius: 4px;
  overflow: hidden;
  margin-left: ${({ offsetFromLeft }) => offsetFromLeft}px;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: "1280px" }}>
        <StyledCalendarContainer>
          <CalendarHeader range={calendarDetailsMock.range} />
          <StyledBody width={Number(calendarDetailsMock.duration.DAILY * 40)}>
            <BarContainer>
              <TaskBar barWidth={200} offsetFromLeft={50}>
                <Text type="caption" color="white">
                  Task 1
                </Text>
              </TaskBar>
            </BarContainer>
            <BarContainer>
              <EngagementBar barWidth={200} offsetFromLeft={50}>
                <Text type="caption" color="white">
                  engagement
                </Text>
              </EngagementBar>
            </BarContainer>
          </StyledBody>
        </StyledCalendarContainer>
      </div>
    </ThemeProvider>
  );
}

export default App;
