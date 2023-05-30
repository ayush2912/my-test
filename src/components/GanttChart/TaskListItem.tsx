import styled from "styled-components";

const StyledTaskListItem = styled.div`
  padding: 12px 28px 12px 16px;
  width: 385px;
  height: 48px;
  &:nth-child(even) {
    background-color: #f1f2f4; /* Stripe color for even list items */
  }

  &:nth-child(odd) {
    background-color: #ffffff; /* Stripe color for odd list items */
  }
`;

export const TaskListItem = ({ name }: { name: string }) => {
  return <StyledTaskListItem>{name}</StyledTaskListItem>;
};
