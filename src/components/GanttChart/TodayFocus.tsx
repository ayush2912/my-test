import styled from "styled-components";

type TodayFocusProps = {
  offsetLeft: number;
  calendarBoxWidth: number;
};

const StyledDiv = styled.div<TodayFocusProps>`
  width: ${(props) => props.calendarBoxWidth}px;
  background-color: #d8e4fc;
  border: none;
  position: absolute;
  margin-left: ${(props) => props.offsetLeft}px;
  height: 100%;
  z-index: 1;
`;

const TodayFocus = (props: TodayFocusProps) => {
  return <StyledDiv {...props} />;
};

export default TodayFocus;
