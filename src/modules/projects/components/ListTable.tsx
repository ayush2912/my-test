import styled from "styled-components";

import { Text } from "../../../components";

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
`;

const TableHeader = styled.thead`
  text-align: left;
  margin-bottom: 8px;
`;

const TableRow = styled.tr``;

const FixedColumn = styled.th<{ width: number }>`
  width: ${({ width }) => width}px;
  height: 32px;
  vertical-align: bottom;
`;

const FlexibleColumn = styled.th`
  height: 32px;
  flex-grow: 1;
  vertical-align: bottom;
`;

const TableBody = styled.tbody`
  background: pink;
`;

const TableCell = styled.td`
  height: 48px;
  padding: 16px 0;
`;

const TwoRowCellContent = styled.div`
  height: 48px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-word;
`;

function ListTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <FlexibleColumn>Flexible Column 4</FlexibleColumn>
          <FlexibleColumn>Flexible Column 5</FlexibleColumn>
          <FlexibleColumn>Flexible Column 1</FlexibleColumn>
          <FixedColumn width={90}>Countries</FixedColumn>
          <FlexibleColumn>Flexible Column 6</FlexibleColumn>
          <FlexibleColumn>Flexible Column 7</FlexibleColumn>
          <FixedColumn width={110}>ANNUAL APPROX. CR. VOL. (tCO2e)</FixedColumn>
          <FixedColumn width={140}>
            <div>LATEST ENGAGEMENT STATE & DUE DATE</div>
          </FixedColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <TwoRowCellContent>
              150 MW Solar Project in Karnataka by Avaada Solar Earth
              Cartonization Mass Object updater
            </TwoRowCellContent>
          </TableCell>
          <TableCell>
            <TwoRowCellContent>
              <Text type="body" color="subdued">
                Gold Standard
              </Text>
              <br />
              <Text type="body" color="subdued">
                Gold standard VCS-VCU-003
              </Text>
            </TwoRowCellContent>
          </TableCell>
          <TableCell>
            <TwoRowCellContent>
              <Text type="body" color="subdued">
                Gold Standard
              </Text>
              <br />
              {/* <Tooltip text={"v.registryId"}> */}
              <Text type="body" color="subdued">
                Gold standard VCS-VCU-003
              </Text>
              {/* </Tooltip> */}
            </TwoRowCellContent>
          </TableCell>
          <TableCell>
            <TwoRowCellContent>
              150 MW Solar Project in Karnataka by Avaada Solar Earth
              Cartonization Mass Object updater
            </TwoRowCellContent>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <TwoRowCellContent>
              150 MW Solar Project in Karnataka by Avaada Solar Earth
              Cartonization Mass Object updater
            </TwoRowCellContent>
          </TableCell>
          <TableCell>
            <TwoRowCellContent>
              <Text type="body" color="subdued">
                Gold Standard
              </Text>
              <br />
              <Text type="body" color="subdued">
                Gold standard VCS-VCU-003
              </Text>
            </TwoRowCellContent>
          </TableCell>
          <TableCell>
            <TwoRowCellContent>
              <Text type="body" color="subdued">
                Gold Standard
              </Text>
              <br />
              {/* <Tooltip text={"v.registryId"}> */}
              <Text type="body" color="subdued">
                Gold standard VCS-VCU-003
              </Text>
              {/* </Tooltip> */}
            </TwoRowCellContent>
          </TableCell>
          <TableCell>
            <TwoRowCellContent>
              150 MW Solar Project in Karnataka by Avaada Solar Earth
              Cartonization Mass Object updater
            </TwoRowCellContent>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default ListTable;
