import styled from "styled-components";

const Card = styled.div<{ width?: number }>`
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  border-radius: 24px;
  box-shadow: ${(props) => props.theme.shadow.card};
  padding: 24px;
  background-color: #ffffff;
`;

export default Card;
