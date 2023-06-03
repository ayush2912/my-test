import styled from "styled-components";

import Text from "../Text";

const Legend = styled.div`
  display: flex;
  gap: 16px;
`;

const Dot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GanttChartLegend = () => {
  const legendItems = [
    { color: "#c4c9d1", label: "Not started" },
    { color: "#0084F4", label: "In progress" },
    { color: "#00A676", label: "Completed" },
  ];

  return (
    <Legend>
      {legendItems.map((item, index) => (
        <LegendItem key={index}>
          <Dot color={item.color} />
          <Text color="subdued" type="caption">
            {item.label}
          </Text>
        </LegendItem>
      ))}
    </Legend>
  );
};

export default GanttChartLegend;
