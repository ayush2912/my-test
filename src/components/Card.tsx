import styled from "styled-components";

const Card = styled.div`
  width: 100%;
  border-radius: 24px;
  box-shadow: ${(props) => props.theme.shadow.card};
  padding: 24px;
  background-color: red;
`;

export default Card;
