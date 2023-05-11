import styled from "styled-components";

import Text from "../../Text";
import {
  ICalendarHeader,
  IMonthlyHeader,
  TemporalView,
  IWeeklyHeader,
  IYearlyHeader,
} from "../Calendar/Calendar.types";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;

  text-transform: uppercase;
  font-size: 12px;
  color: #999999;
  height: 24px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
`;

const RowContainer = styled.div`
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
    <RowContainer>
      {data?.map(({ month, year, days }) => (
        <div key={`${month}${year}`}>
          <HeaderContainer>
            <Text type="smallText" color="subdued">
              {`${month} ${year}`}
            </Text>
          </HeaderContainer>

          <RowContainer>
            {days.map(({ day }) => (
              <DayContainer key={day}>
                <Text type="captionBold" color="subdued">
                  {day}
                </Text>
              </DayContainer>
            ))}
          </RowContainer>
        </div>
      ))}
    </RowContainer>
  );
};

const YearlyHeader = ({ data }: { data: IYearlyHeader }) => {
  return (
    <RowContainer>
      {data?.map(({ year, months }) => (
        <div key={year}>
          <HeaderContainer>
            <Text type="smallText" color="subdued">
              {`${year}`}
            </Text>
          </HeaderContainer>

          <RowContainer>
            {months.map(({ month }) => (
              <MonthContainer key={month}>
                <Text type="captionBold" color="subdued">
                  {month}
                </Text>
              </MonthContainer>
            ))}
          </RowContainer>
        </div>
      ))}
    </RowContainer>
  );
};

const WeeklyHeader = ({ data }: { data: IWeeklyHeader }) => {
  return (
    <RowContainer>
      {data?.map(({ year, month, sundays }, index) => (
        <div key={month + year}>
          <HeaderContainer>
            <Text type="smallText" color="subdued">
              {`${month} ${year}`}
            </Text>
          </HeaderContainer>

          <RowContainer>
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
          </RowContainer>
        </div>
      ))}
    </RowContainer>
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
