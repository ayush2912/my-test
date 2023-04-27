import styled from "styled-components";

import Text from "./Text";

export interface TabData {
  label: string;
  value: string;
}

interface TabsInfoType {
  tabs: Array<TabData>;
  selectedTab: string;
  onSelect: (value: string) => void;
}

const TabsHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  background: #ffffff;
  border: 1px solid #eff4fe;
  border-radius: 8px;
  width: fit-content;
`;

const Tab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-radius: 8px;
  width: fit-content;
  border: none;
  background: #ffffff;
  cursor: pointer;
`;
const ActiveTab = styled(Tab)`
  background: #d8e4fc;
`;

export default function Tabs({ tabs, selectedTab, onSelect }: TabsInfoType) {
  return (
    <TabsHolder>
      {tabs.map((tab) => {
        return tab.value == selectedTab ? (
          <ActiveTab>
            <Text type="bodyBold" color="primary">
              {tab.label}
            </Text>
          </ActiveTab>
        ) : (
          <Tab onClick={() => onSelect(tab.value)}>
            <Text type="bodyBold" color="subdued">
              {tab.label}
            </Text>
          </Tab>
        );
      })}
    </TabsHolder>
  );
}
