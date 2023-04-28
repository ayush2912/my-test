import styled from "styled-components";

import Text from "./Text";

type LabelValueType = {
  label: string;
  value: string | number;
};

const LabelValueContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 16px 0px;
`;

export default function LabelValue({ label, value }: LabelValueType) {
  return (
    <LabelValueContent>
      <Text type="body" color="subdued">
        {label}
      </Text>
      <Text type="body" color="default">
        {value ? value : "-"}
      </Text>
    </LabelValueContent>
  );
}
