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

const Tab = styled.button<{ currentTab: string; selectedTab: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-radius: 8px;
  width: fit-content;
  height: 32px;
  border: none;
  cursor: pointer;
  background: ${(props) =>
    props.currentTab === props.selectedTab ? "#d8e4fc" : "#ffffff"};
`;

export default function Tabs({ tabs, selectedTab, onSelect }: TabsInfoType) {
  return (
    // color="primary"/
    <TabsHolder>
      {tabs.map((tab) => {
        return (
          <Tab
            key={tab.value}
            currentTab={tab.value}
            selectedTab={selectedTab}
            onClick={() => onSelect(tab.value)}
          >
            <Text
              type="bodyBold"
              color={tab.value === selectedTab ? "primary" : "subdued"}
            >
              {tab.label}
            </Text>
          </Tab>
        );
      })}
    </TabsHolder>
  );
}
