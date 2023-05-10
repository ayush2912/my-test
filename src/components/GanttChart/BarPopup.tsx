import styled from "styled-components";

export interface PopupPosition {
  top: number;
  left: number;
}
export const BarPopup = styled.div<PopupPosition>`
  position: absolute;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadow.md};
  padding: 12px;
  width: 304px;
  background-color: #ffffff;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
`;
