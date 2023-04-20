import styled from "styled-components";

const StyledStatusTag = styled.div<{
  type: "error" | "warning" | "success" | "information" | "disabled";
}>`
  width: fit-content;
  border-radius: 8px;
  padding: 4px 8px;
  background-color: ${(props) =>
    props.theme.colors.semantic[props.type].default};
`;

export default function StatusTag({
  name,
  type,
}: {
  name: string;
  type: "error" | "warning" | "success" | "information" | "disabled";
}) {
  return (
    <StyledStatusTag type={type}>
      <span>{name}</span>
    </StyledStatusTag>
  );
}
