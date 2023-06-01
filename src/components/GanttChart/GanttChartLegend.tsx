import styled from "styled-components";

import Text from "../../../components/Text";

const Legend = styled.div`
  gap: 16px;
  display: flex;

  div {
    gap: 8px;
    display: flex;
    align-items: center;
  }
`;

const Dot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => props.color};
`;

const GanttChartLengend = () => {
  return (
    <Legend>
      <div>
        <Dot color="#c4c9d1" />
        <Text color="subdued" type="caption">
          Not started
        </Text>
      </div>
      <div>
        <Dot color="#0084F4" />
        <Text color="subdued" type="caption">
          In progress
        </Text>
      </div>
      <div>
        <Dot color="#00A676" />
        <Text color="subdued" type="caption">
          Completed
        </Text>
      </div>
    </Legend>
  );
};

export default GanttChartLengend;
