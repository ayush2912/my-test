import styled from "styled-components";

import Text from "./Text";

const StyledTable = styled.table`
  table-layout: auto;
  width: 100%;
  overflow-x: auto;
`;

const TableHeader = styled.th`
  text-align: left;
`;

const HeaderContent = styled.div`
  display: flex;
  padding: 3px;
  padding-bottom: 2px;
  white-space: pre;
  &:first-child,
  &:last-child {
    padding-left: 0;
  }
`;

const HeaderText = styled.span`
  font-size: 0.75rem;
  color: #a1a1a6;
  letter-spacing: 0.0625em;
`;

const TableRow = styled.tr`
  height: "72px";
`;

const TableCell = styled.td``;

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

function Table({
  headers,
  tableData,
  cellContentMapper,
}: {
  headers: Array<any>;
  tableData: Array<any>;
  cellContentMapper: any;
}) {
  return (
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
          .map((v) => cellContentMapper(v))
          .map((rowItem) => (
            <TableRow key={rowItem.rowId}>
              {headers.map(({ fieldName }, i) => (
                <TableCell key={fieldName}>
                  <CellContent>{rowItem[fieldName]}</CellContent>
                </TableCell>
              ))}
            </TableRow>
          ))}
      </tbody>
    </StyledTable>
  );
}

export default Table;
