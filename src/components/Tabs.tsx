import styled from "styled-components";

import Text from "./Text";

export interface TabData {
  label: string;
  value: string;
}

interface TabsInfoType {
  tabs: Array<TabData>;
  selectedTab: string;
}

const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-radius: 8px;
  width: fit-content;
`;
const ActiveTab = styled(Tab)`
  background: #d8e4fc;
`;

export default function Tabs({ tabs, selectedTab }: TabsInfoType) {
  return (
    <>
      {tabs.map((tab) => {
        return tab.value == selectedTab ? (
          <ActiveTab>
            <Text type="bodyBold" color="primary">
              {tab.label}
            </Text>
          </ActiveTab>
        ) : (
          <Tab>
            <Text type="bodyBold" color="subdued">
              {tab.label}
            </Text>
          </Tab>
        );
      })}
    </>
  );
}
