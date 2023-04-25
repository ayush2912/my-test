import styled from "styled-components";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import StatusTag from "@/components/StatusTag";
import Text from "@/components/Text";

import TaskList from "./TaskList";

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

const TableWidthCell = styled.td`
  padding: 0px;
`;
const Divider = styled.div`
  height: 1px;
  background-color: ${(props) => props.theme.colors.neutral[100]};
  width: 100%;
`;

const cellContentMapper = (v: any) => {
  return {
    engagements: <Text type="bodyBold">{`Task name`}</Text>,
    startDate: <Text type="body">{`start date`}</Text>,
    dueDate: <Text type="body">{`end date`}</Text>,
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
    chevronButton: <Icon name="chevronButton" />,
  };
};

function EngagementTable({
  headers,
  tableData,
}: {
  headers: Array<any>;
  tableData: Array<any>;
}) {
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

                {/* <tr>
                  <TableWidthCell colSpan={headers.length}>
                    <TaskList
                      name="Task 1"
                      startDate="DD/MM/YYY"
                      dueDate="DD/MM/YYY"
                      status="COMPLETED"
                    />
                  </TableWidthCell>
                </tr> */}

                {/* Divider */}
                {rowIndex !== tableData.length - 1 && (
                  <tr>
                    <TableWidthCell colSpan={headers.length}>
                      <Divider />
                    </TableWidthCell>
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
