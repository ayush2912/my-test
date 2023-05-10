import styled from "styled-components";

import { TemporalView } from "./Calendar.type";

export const CalendarBackground = styled.div<{
  width: number;
  view: TemporalView;
}>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width}px;
  min-height: 500px;
  overflow-y: scroll;
  border: 1px solid #f1f2f4;
  background-color: #ffffff;
  background-image: linear-gradient(
      to right,
      rgba(225, 228, 232, 0.5) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, transparent 40px, rgba(241, 242, 244, 0.5) 1px);

  background-size: ${({ view }) =>
      ({ weekly: 155, monthly: 40, yearly: 124 }[view])}px
    80px;
`;
