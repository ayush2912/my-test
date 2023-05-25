import styled from "styled-components";

import Text from "./Text";
import noProjectIcon from "../assets/images/noProject.png";

const EmptyStateImageDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 53px 0px 36px 0px;
`;
const EmptyStateTextContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: 308px;
  margin: auto;
  gap: 8px;
`;

const EmptyStateDisplay = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StyledTable = styled.table`
  table-layout: auto;
  width: 100%;
  overflow-x: auto;
`;

const TableHeader = styled.th`
  text-align: left;
  padding-bottom: 24px;
`;

const TableBody = styled.tbody``;

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

const TableRow = styled.tr``;

const TableCell = styled.td`
  padding-bottom: 40px;
`;

const CellContent = styled.div`
  display: flex;
  align-items: center;
`;

function Table({
  headers,
  tableData,
  cellContentMapper,
  emptyStateTitle,
  emptyStateSubTitle,
}: {
  headers: Array<any>;
  tableData: Array<any>;
  cellContentMapper: any;
  emptyStateTitle: string;
  emptyStateSubTitle: string;
}) {
  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            {headers.length > 0 &&
              headers.map((header) => {
                return (
                  <TableHeader key={header.fieldName}>
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

        <TableBody style={{ width: "100%" }}>
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
        </TableBody>
      </StyledTable>
      {tableData.length === 0 && (
        <EmptyStateDisplay>
          <div>
            <EmptyStateImageDiv>
              <img src={noProjectIcon} />
            </EmptyStateImageDiv>

            <EmptyStateTextContent>
              <Text color="default" type="heading3">
                {emptyStateTitle}
              </Text>

              <Text color="subdued" type="body">
                {emptyStateSubTitle}
              </Text>
            </EmptyStateTextContent>
          </div>
        </EmptyStateDisplay>
      )}
    </>
  );
}

export default Table;
