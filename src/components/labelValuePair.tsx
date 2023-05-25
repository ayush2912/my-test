import styled from "styled-components";

import Text from "./Text";

type LabelValueType = {
  label: string;
  value: string | number;
  type: string;
};

const LabelValueContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 16px 0px;
`;

export default function LabelValue({ label, value, type }: LabelValueType) {
  return (
    <LabelValueContent>
      <Text type="body" color="subdued">
        {label}
      </Text>
      {
        {
          url: (
            <a href={value.toString()} target="blank">
              <Text type="body" color="primary">
                {value ? value : "-"}
              </Text>
            </a>
          ),
          string: (
            <Text type="body" color="default">
              {value ? value : "-"}
            </Text>
          ),
          datetime: (
            <Text type="body" color="default">
              {value ? value : "-"}
            </Text>
          ),
        }[type]
      }
    </LabelValueContent>
  );
}
