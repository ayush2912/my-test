import moment from "moment";
import { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

import { getFirstSundayOfYear } from "../../../utils/calendarHelper";
import Text from "../../Text";
import {
  ICalendarHeader,
  IMonthlyHeader,
  TemporalView,
  IWeeklyHeader,
  IYearlyHeader,
} from "../Calendar/Calendar.types";
import TodayFocus from "../TodayFocus";
import useGanttChartControls from "../useGanttChartControls";

const CalendarHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #e1e4e8;
  border-bottom: 1px solid #e1e4e8;
  padding-top: 24px;
  padding-bottom: 8px;
  position: relative;
  z-index: 1;
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

const SundayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: "transparent";
  color: "#999999";

  width: 155px;
  padding: 4px 0px;
  font-size: 14px;
  border-radius: 4px;
`;

const MonthlyHeader = ({ data }: { data: IMonthlyHeader }) => {
  return (
    <>
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
    </>
  );
};

const YearlyHeader = ({ data }: { data: IYearlyHeader }) => {
  return (
    <>
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
    </>
  );
};

const WeeklyHeader = ({ data }: { data: IWeeklyHeader }) => {
  return (
    <>
      {data?.map(({ year, month, sundays }, index) => (
        <div key={month + year}>
          <TopRowContainer>
            <Text type="smallText" color="subdued">
              {`${month} ${year}`}
            </Text>
          </TopRowContainer>

          <BottomRowContainer>
            {sundays.map((s, i) => (
              <SundayContainer key={s + month + year}>
                <Text type="captionBold" color="subdued">
                  {`${s} ${i === 0 ? month : ""}`}
                </Text>
              </SundayContainer>
            ))}
          </BottomRowContainer>
        </div>
      ))}
    </>
  );
};
export const CalendarHeader = ({
  calendarHeader,
  earliestStartDate,
  offsetForToday,
  todayRef,
}: {
  calendarHeader: ICalendarHeader;
  view: TemporalView;
  earliestStartDate: Date;
  offsetForToday: number;
  todayRef: React.RefObject<HTMLDivElement>;
}) => {
  const { view, selectedEngagement } = useGanttChartControls();
  const earliestRef = useRef<HTMLDivElement | null>(null);
  const earliestDateOffset = useMemo(() => {
    return {
      monthly:
        moment(selectedEngagement.startDate).diff(
          moment(earliestStartDate).startOf("year"),
          "days",
          true,
        ) * 40,
      yearly:
        moment(selectedEngagement.startDate).diff(
          moment(earliestStartDate).startOf("year"),
          "months",
          true,
        ) * 124,
      weekly:
        moment(selectedEngagement.startDate).diff(
          getFirstSundayOfYear(moment(earliestStartDate).startOf("year")),
          "weeks",
          true,
        ) * 155,
    }[view];
  }, [view, selectedEngagement]);

  useEffect(() => {
    if (earliestRef.current)
      earliestRef.current.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center",
      });
  }, [view]);

  return (
    <CalendarHeaderContainer>
      {view === "monthly" && (
        <TodayFocus
          ref={todayRef}
          offsetLeft={offsetForToday * 40}
          calendarBoxWidth={40}
        />
      )}

      <div
        ref={earliestRef}
        style={{ position: "absolute", marginLeft: earliestDateOffset }}
      />

      {
        {
          monthly: <MonthlyHeader data={calendarHeader.monthly} />,
          yearly: <YearlyHeader data={calendarHeader.yearly} />,
          weekly: <WeeklyHeader data={calendarHeader.weekly} />,
        }[view]
      }
    </CalendarHeaderContainer>
  );
};
