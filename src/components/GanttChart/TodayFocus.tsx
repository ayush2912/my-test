import { forwardRef } from "react";
import styled from "styled-components";

type TodayFocusProps = {
  offsetLeft: number;
  calendarBoxWidth: number;
};

const StyledDiv = styled.div<TodayFocusProps>`
  width: 40px;
  background-color: #d8e4fc;
  border: none;
  position: absolute;
  margin-left: ${(props) => props.offsetLeft}px;
  height: 100%;
  z-index: 1;
  opacity: 0.3;
  top: 0;
`;

export const TodayFocus = forwardRef<HTMLDivElement, TodayFocusProps>(
  (props, ref) => {
    return <StyledDiv ref={ref} {...props} />;
  },
);

TodayFocus.displayName = "TodayFocus";

export default TodayFocus;
