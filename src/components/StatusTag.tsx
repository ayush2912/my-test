import styled from "styled-components";

import Text from "./Text";

const StyledStatusTag = styled.div<{
  type: StatusType;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  border-radius: 8px;
  padding: 4px 8px;
  background-color: ${(props) =>
    props.theme.colors.semantic[props.type].default};
`;
export type StatusType =
  | "error"
  | "warning"
  | "success"
  | "information"
  | "disabled";
export default function StatusTag({
  name,
  type,
}: {
  name: string;
  type: StatusType;
}) {
  return (
    <StyledStatusTag type={type}>
      <Text type="smallTextBold" color="white">
        {name}
      </Text>
    </StyledStatusTag>
  );
}
