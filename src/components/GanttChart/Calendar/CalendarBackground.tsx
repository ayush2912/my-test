import { ReactNode, forwardRef } from "react";
import styled from "styled-components";

import { TemporalView } from "./Calendar.types";

type CalendarBackgroundProps = {
  width: number;
  view: TemporalView;
  children: ReactNode;
};
export const CalendarBackground = forwardRef<
  HTMLDivElement,
  CalendarBackgroundProps
>(({ width, view, children }, ref) => {
  return (
    <StyledCalendarBackground ref={ref} width={width} view={view}>
      {children}
    </StyledCalendarBackground>
  );
});

CalendarBackground.displayName = "CalendarBackground";

export const StyledCalendarBackground = styled.div<CalendarBackgroundProps>`
  display: flex;
  flex-direction: column;
  height: fit-content;
  position: relative;
  width: ${({ width }) => width}px;
  background-color: #ffffff;
  background-image: linear-gradient(
      to right,
      rgba(225, 228, 232, 0.5) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, transparent 48px, rgba(241, 242, 244, 0.5) 1px);

  background-size: ${({ view }) =>
      ({ weekly: 155, monthly: 40, yearly: 124 }[view])}px
    96px;
`;
