import styled from "styled-components";

import Card from "@/components/Card";
import StatusTag from "@/components/StatusTag";
import Text from "@/components/Text";

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

const TableRow = styled.tr``;

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

const DividerTableCell = styled.td`
  padding: 0px;
`;
const Divider = styled.div`
  height: 1px;
  background-color: ${(props) => props.theme.colors.neutral[100]};
  width: 100%;
`;

const cellContentMapper = (v: any) => {
  return {
    engagements: <Text type="bodyBold">{v.name}</Text>,
    startDate: (
      <Text type="bodyBold">{convertToEuropeanDateFormat(v.startDate)}</Text>
    ),
    dueDate: (
      <Text type="bodyBold">{convertToEuropeanDateFormat(v.dueDate)}</Text>
    ),
    state: <StatusTag name="IN PROGRESS" type="information" />,
    note: <div>note</div>,
    documents: <div>documents</div>,
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
                <TableRow key={rowItem.rowId}>
                  {headers.map(({ fieldName }) => (
                    <TableCell key={fieldName}>
                      <CellContent>{rowItem[fieldName]}</CellContent>
                    </TableCell>
                  ))}
                </TableRow>
                {rowIndex !== tableData.length - 1 && (
                  <tr>
                    <DividerTableCell colSpan={headers.length}>
                      <Divider />
                    </DividerTableCell>
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
