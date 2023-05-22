import styled, { keyframes } from "styled-components";

import { ReactComponent as Cross } from "../../../assets/icons/generic/cross.svg";
import { ReactComponent as LoaderIcon } from "../../../assets/icons/generic/loader.svg";
import Text from "../../../components/Text";

// export interface PanelInfo {}

const Panel = styled.div`
  height: 400px;
  width: 672px;
  padding: 24px 33px 0px 24px;
`;
const FlexBox = styled.div.attrs((props: { gap: string }) => props)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Divider = styled.div`
  height: 1px;
  background: #e1e4e8;
  margin-top: 24px;
`;

const DocumentList = styled.div`
  > * {
    border-top: 1px solid #e1e4e8;
  }

  &:first-child {
    border-top: none;
  }
`;

const ButtonCss = styled.button`
  border: none;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
`;

const LoaderContainer = styled.div`
  margin-top: 188px;
  display: flex;
  justify-content: center;
`;

const Loader = styled.div`
  animation: rotate(360deg) 2s linear infinite;
`;

export default function DocumentListPanel({
  docQuantity,
  children,
  loading,
  onClose,
  title,
}: {
  docQuantity: string | number;
  children: React.ReactNode;
  onClose: () => void;
  loading: boolean;
  title: string;
}) {
  return (
    <Panel>
      <FlexBox>
        <Text type="heading3" color="default">
          Documents ({docQuantity})
        </Text>

        <ButtonCss onClick={onClose}>
          <Cross />
        </ButtonCss>
      </FlexBox>

      <Text type="body" color="default">
        {title}
      </Text>

      <Divider />
      {loading ? (
        <LoaderContainer>
          <Loader>
            <LoaderIcon />
          </Loader>
        </LoaderContainer>
      ) : (
        <DocumentList>{children}</DocumentList>
      )}
    </Panel>
  );
}
