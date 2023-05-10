import styled from "styled-components";

import Icon from "../components/Icon";

const EyeButtonCss = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 8px;
  width: 32px;
  height: 32px;
  background: #ffffff;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  &:hover {
    background-color: #bdc3c7;
  }
`;

function EyeButton({ onClick }: { onClick: () => void }) {
  return (
    <EyeButtonCss onClick={onClick}>
      <Icon name="eyeIcon" />
    </EyeButtonCss>
  );
}

export default EyeButton;
