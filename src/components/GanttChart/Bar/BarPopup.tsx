import styled from "styled-components";

export interface PopupPosition {
  top: number;
  left: number;
}
export const BarPopup = styled.div<PopupPosition>`
  position: fixed;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadow.md};
  padding: 12px;
  min-width: 304px;
  max-width: fit;
  padding: 16px;
  background-color: #ffffff;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  z-index: 9999;
`;
