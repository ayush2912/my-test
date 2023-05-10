import styled from "styled-components";

import Text from "../Text";

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

interface Range {
  calendarWidth: CalendarWidth;
  calendarHeader: CalendarHeader;
}

type CalendarWidth = {
  monthly: number;
  weekly: number;
  yearly: number;
};

type CalendarHeader = {
  monthly: MonthlyHeader;
  weekly: WeeklyHeader;
  yearly: YearlyHeader;
};

type YearlyHeader = {
  year: string;
  months: { month: string; isThisMonth?: boolean }[];
}[];

type MonthlyHeader = {
  month: string;
  year: string;
  days: { day: number; isToday?: boolean }[];
}[];

type WeeklyHeader = {
  month: string;
  year: string;
  sundays: string[];
}[];

type CalendarRange = Range;

const MonthlyHeader = ({ data }: { data: MonthlyHeader }) => {
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

const YearlyHeader = ({ data }: { data: YearlyHeader }) => {
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

const WeeklyHeader = ({ data }: { data: WeeklyHeader }) => {
  return (
    <RowContainer>
      {data?.map(({ year, month, sundays }, index) => (
        <div key={month}>
          <HeaderContainer>
            <Text type="smallText" color="subdued">
              {`${month} ${year}`}
            </Text>
          </HeaderContainer>

          <RowContainer>
            {sundays.map((s, i) => (
              <SundayContainer
                key={s}
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
  calendarInfo,
  view,
}: {
  calendarInfo: CalendarRange;
  view: "monthly" | "yearly" | "weekly";
}) => {
  return (
    <>
      {
        {
          monthly: <MonthlyHeader data={calendarInfo.calendarHeader.monthly} />,
          yearly: <YearlyHeader data={calendarInfo.calendarHeader.yearly} />,
          weekly: <WeeklyHeader data={calendarInfo.calendarHeader.weekly} />,
        }[view]
      }
    </>
  );
};
