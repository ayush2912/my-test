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

// interface Range {
//   month: string;
//   monthShortName: string;
//   noOfDays: {
//     day: number;
//     isToday?: boolean;
//   }[];
//   year: string;
//   isThisMonth: boolean;
// }

interface Range {
  duration: any;
  monthlyHeaderData: MonthlyRange;
  yearlyHeaderData: YearlyRange;
}

type YearlyRange = {
  year: string;
  months: { month: string; isThisMonth?: boolean }[];
}[];

type MonthlyRange = {
  month: string;
  year: string;
  days: { day: number; isToday?: boolean }[];
}[];

// type WeeklyRange = {
//   month: string;
//   year: string;
//   days: { day: number; isThisWeek?: boolean }[];
// }[];

type CalendarRange = Range;

const MonthlyHeader = ({
  data: { monthlyHeaderData },
}: {
  data: CalendarRange;
}) => {
  return (
    <RowContainer>
      {monthlyHeaderData?.map(({ month, year, days }) => (
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

const YearlyHeader = ({
  data: { yearlyHeaderData },
}: {
  data: CalendarRange;
}) => {
  return (
    <RowContainer>
      {yearlyHeaderData?.map(({ year, months }) => (
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

export const CalendarHeader = ({
  range,
  view,
}: {
  range: CalendarRange;
  view: "monthly" | "yearly";
}) => {
  return (
    <>
      {
        {
          monthly: <MonthlyHeader data={range} />,
          yearly: <YearlyHeader data={range} />,
        }[view]
      }
    </>
  );
};
