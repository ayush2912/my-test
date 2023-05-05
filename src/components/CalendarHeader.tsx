import { Key } from "react";
import styled from "styled-components";

import Text from "./Text";

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

export const CalendarHeader = ({ range }: any) => {
  const RowContainer = styled.div`
    display: flex;
    align-items: center;
  `;

  return (
    <RowContainer>
      {range?.map(
        (
          { month, monthShortName, noOfDays, year }: any,
          ind: Key | null | undefined,
        ) => (
          <div key={ind}>
            <HeaderContainer>
              <Text type="smallText" color="subdued">
                {`${monthShortName} ${year}`}
              </Text>
            </HeaderContainer>

            <RowContainer>
              {noOfDays.map(({ day }: any) => (
                <DayContainer key={day}>
                  <Text type="captionBold" color="subdued">
                    {day}
                  </Text>
                </DayContainer>
              ))}
            </RowContainer>
          </div>
        ),
      )}
    </RowContainer>
  );
};
