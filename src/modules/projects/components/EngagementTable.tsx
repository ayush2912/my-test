import { useState } from "react";
import styled from "styled-components";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import StatusTag from "@/components/StatusTag";
import Text from "@/components/Text";

import TaskList from "./TaskList";
import { convertToEuropeanDateFormat } from "../../../utils/dateTimeFormatter";

const StyledTable = styled.table`
  table-layout: auto;
  width: 100%;
`;

const TableHeader = styled.th`
  padding: 0px;
  text-align: left;
`;

const HeaderContent = styled.div`
  display: flex;
  white-space: nowrap;
`;

const TableCell = styled.td`
  padding: 16px 0px;
  height: 40px;
`;

const CellContent = styled.div`
  display: flex;
  padding-left: 3px;
  padding-right: 3px;
  padding-top: 1px;
  align-items: center;

  &:first-child,
  &:last-child {
    padding-left: 0;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${(props) => props.theme.colors.neutral[100]};
  width: 100%;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DividerCell = styled.td`
  padding: 0px;
`;

const TaskListCell = styled.td`
  padding: 0px;
  padding-bottom: 16px;
`;

const ChevronButtonIconWrapper = styled.div<{ isExpanded: boolean }>`
  width: 24px;
  height: 24px;
  transform: ${(props) => (props.isExpanded ? `rotate(180deg)` : "")};
  cursor: pointer;
`;

function EngagementTable({
  headers,
  tableData,
}: {
  headers: Array<any>;
  tableData: Array<any>;
}) {
  const cellContentMapper = (v: any) => {
    const [showTasks, setShowTasks] = useState(false);
    const toggleTasks = () => setShowTasks(!showTasks);
    return {
      engagements: (
        <ColumnWrapper>
          <Text type="bodyBold">{`engagement name`}</Text>
          <Text type="caption" color="subdued">
            3 tasks
          </Text>
        </ColumnWrapper>
      ),
      startDate: (
        <Text type="body" color={"subdued"}>
          {convertToEuropeanDateFormat(v.startDate)}
        </Text>
      ),
      dueDate: (
        <Text type="body" color={"subdued"}>
          {convertToEuropeanDateFormat(v.dueDate)}
        </Text>
      ),
      state: <StatusTag name="IN PROGRESS" type="information" />,
      note: (
        <Button type="ghost">
          <Icon name="message" />
        </Button>
      ),
      documents: (
        <Button type="ghost">
          <Icon name="file" />
          <Text type="bodyBold">{20}</Text>
        </Button>
      ),
      chevronButton: (
        <ChevronButtonIconWrapper isExpanded={showTasks} onClick={toggleTasks}>
          <Icon name="chevronButton" />
        </ChevronButtonIconWrapper>
      ),
      taskList: showTasks && (
        <TaskListCell colSpan={headers.length}>
          <TaskList
            name="Task 1"
            startDate={new Date()}
            dueDate={new Date()}
            status="COMPLETED"
          />

          <TaskList
            name="Task 1"
            startDate={new Date()}
            dueDate={new Date()}
            status="COMPLETED"
          />
        </TaskListCell>
      ),
    };
  };

  return (
    <Card width={850}>
      <StyledTable>
        <thead>
          <tr>
            {headers.length > 0 &&
              headers.map((header, i) => {
                return (
                  <TableHeader key={i}>
                    <HeaderContent>
                      <Text type="smallTextBold" color="subdued">
                        {header.name}
                      </Text>
                    </HeaderContent>
                  </TableHeader>
                );
              })}
          </tr>
        </thead>

        <tbody>
          {tableData
            .map(cellContentMapper)
            .map((rowItem: any, rowIndex: number) => (
              <>
                <tr key={rowItem.rowId}>
                  {headers.map(({ fieldName }) => (
                    <TableCell key={fieldName}>
                      <CellContent>{rowItem[fieldName]}</CellContent>
                    </TableCell>
                  ))}
                </tr>

                {rowItem.taskList}

                {/* Divider */}
                {rowIndex !== tableData.length - 1 && (
                  <tr>
                    <DividerCell colSpan={headers.length}>
                      <Divider />
                    </DividerCell>
                  </tr>
                )}
              </>
            ))}
        </tbody>
      </StyledTable>
    </Card>
  );
}

export default EngagementTable;
