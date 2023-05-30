import styled from "styled-components";

import Text from "../../Text";
import {
  ICalendarHeader,
  IMonthlyHeader,
  TemporalView,
  IWeeklyHeader,
  IYearlyHeader,
} from "../Calendar/Calendar.types";

const CalendarHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e1e4e8;
  padding-top: 24px;
  padding-bottom: 8px;
`;

const TopRowContainer = styled.div`
  display: flex;
  flex-direction: row;

  text-transform: uppercase;
  font-size: 12px;
  color: #999999;
  height: 16px;

  margin-bottom: 8px;
  justify-content: center;
  align-items: center;
`;

const BottomRowContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: "transparent";
  color: "#999999";

  width: 40px;
  padding: 4px 0px;
  font-size: 14px;
  border-radius: 4px;
`;
const MonthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: "transparent";
  color: "#999999";

  width: 124px;
  padding: 4px 0px;
  font-size: 14px;
  border-radius: 4px;
`;

const SundayContainer = styled.div<{ lastWeek: boolean }>`
  display: flex;
  align-items: center;
  background-color: "transparent";
  color: "#999999";

  width: ${(props) => (props.lastWeek ? 0 : 155)}px;
  padding: 4px 0px;
  font-size: 14px;
  border-radius: 4px;
`;

const MonthlyHeader = ({ data }: { data: IMonthlyHeader }) => {
  return (
    <CalendarHeaderContainer>
      {data?.map(({ month, year, days }) => (
        <div key={`${month}${year}`}>
          <TopRowContainer>
            <Text type="smallText" color="subdued">
              {`${month} ${year}`}
            </Text>
          </TopRowContainer>

          <BottomRowContainer>
            {days.map(({ day }) => (
              <DayContainer key={day}>
                <Text type="captionBold" color="subdued">
                  {day}
                </Text>
              </DayContainer>
            ))}
          </BottomRowContainer>
        </div>
      ))}
    </CalendarHeaderContainer>
  );
};

const YearlyHeader = ({ data }: { data: IYearlyHeader }) => {
  return (
    <CalendarHeaderContainer>
      {data?.map(({ year, months }) => (
        <div key={year}>
          <TopRowContainer>
            <Text type="smallText" color="subdued">
              {`${year}`}
            </Text>
          </TopRowContainer>

          <BottomRowContainer>
            {months.map(({ month }) => (
              <MonthContainer key={month}>
                <Text type="captionBold" color="subdued">
                  {month}
                </Text>
              </MonthContainer>
            ))}
          </BottomRowContainer>
        </div>
      ))}
    </CalendarHeaderContainer>
  );
};

const WeeklyHeader = ({ data }: { data: IWeeklyHeader }) => {
  return (
    <CalendarHeaderContainer>
      {data?.map(({ year, month, sundays }, index) => (
        <div key={month + year}>
          <TopRowContainer>
            <Text type="smallText" color="subdued">
              {`${month} ${year}`}
            </Text>
          </TopRowContainer>

          <BottomRowContainer>
            {sundays.map((s, i) => (
              <SundayContainer
                key={s + month + year}
                lastWeek={index === data.length - 1 && i === sundays.length - 1}
              >
                <Text type="captionBold" color="subdued">
                  {`${s} ${i === 0 ? month : ""}`}
                </Text>
              </SundayContainer>
            ))}
          </BottomRowContainer>
        </div>
      ))}
    </CalendarHeaderContainer>
  );
};
export const CalendarHeader = ({
  calendarHeader,
  view,
}: {
  calendarHeader: ICalendarHeader;
  view: TemporalView;
}) => {
  return (
    <>
      {
        {
          monthly: <MonthlyHeader data={calendarHeader.monthly} />,
          yearly: <YearlyHeader data={calendarHeader.yearly} />,
          weekly: <WeeklyHeader data={calendarHeader.weekly} />,
        }[view]
      }
    </>
  );
};
