// import Flag from "react-world-flags";

import styled from "styled-components";

import Icon, { IconNameType } from "../../../components/Icon";
import Text from "../../../components/Text";
import { convertToEuropeanDateFormat } from "../../../utils/dateTimeFormatter";

export const Table = styled.table`
  width: 100%;
  border-spacing: 5px 20px;
`;

export const TableHeader = styled.th`
  padding: 0px;
  text-align: left;
`;

export const TableColumn = styled.td`
  padding: 0px;
  text-align: left;
  max-width: 196px;
`;
export const TableRow = styled.tr``;

export const Content = styled.div`
  margin-right: 24px;
`;

export interface ProjectRowItem {
  projectName: string;
  registryName: string;
  registryId: string;
  projectTypes: string[];
  subTypes: string[];
  countries: { id: string; name: string; iso2Name: string; iso3Name: string }[];
  portfolioOwner: string;
  assetOwners: { id: string; name: string }[];
  annualApproximateCreditVolume: number;
  engagement: {
    state: string;
    dueDate: string;
    type: string;
  };
}

export interface Headers {
  name: string;
  fieldName: string;
}

function ProjectListTable({
  headers,
  tableData,
}: {
  headers: Headers[];
  tableData: ProjectRowItem[];
}) {
  const cellContentMapper = (v: ProjectRowItem) => {
    const selectedIconName = {
      IN_PROGRESS: "inProgress",
      COMPLETED: "success",
      NOT_STARTED: "notStarted",
      DISCONTINUED: "discontinued",
    }[v.engagement.state] as IconNameType;
    return {
      projectName: (
        <Content>
          <Text type="bodyBold" color="default">
            {v.projectName}
          </Text>
        </Content>
      ),
      registyNameID: (
        <Content>
          <Text type="body" color="subdued">
            {v.registryName}
          </Text>
          <br />
          <Text type="body" color="subdued">
            {v.registryId}
          </Text>
        </Content>
      ),
      projectTypeSubtype: (
        <Content>
          <Text type="body" color="subdued">
            {v.projectTypes.map((type) => type).join(", ")}
          </Text>
          <br />
          <Text type="body" color="subdued">
            {v.subTypes.map((type) => type).join(", ")}
          </Text>
        </Content>
      ),
      coutries: (
        <Content>
          {v.countries.map((country) => (
            <div className="w-6 h-3" key={country.iso3Name}>
              India
              {/* <Flag code={country?.iso3Name} /> */}
            </div>
          ))}
        </Content>
      ),
      portfolioOwners: (
        <Content>
          <Text type="body" color="subdued">
            {v.portfolioOwner}
          </Text>
        </Content>
      ),
      assetOwners: (
        <Content>
          <Text type="body" color="subdued">
            {v.assetOwners.map((owner) => owner.name).join(", ")}
          </Text>
        </Content>
      ),
      annualApproximateCreditVolume: (
        <Content>
          <Text type="body" color="subdued">
            {v.annualApproximateCreditVolume}
          </Text>
        </Content>
      ),
      engagement: (
        <Content>
          <div style={{ display: "flex", alignContent: "center" }}>
            <Icon name={selectedIconName} />
            <Text type="bodyBold" color="default">
              {v.engagement.type}
            </Text>
          </div>
          <Text type="caption" color="subdued">
            {convertToEuropeanDateFormat(v.engagement.dueDate)}
          </Text>
        </Content>
      ),
    };
  };

  return (
    <Table>
      <thead>
        <tr>
          {headers.map((header) => (
            <TableHeader key={header.fieldName}>
              <Text type="smallTextBold" color="subdued">
                {header.name}
              </Text>
            </TableHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map(cellContentMapper).map((rowItem: any, index) => (
          <TableRow key={index}>
            {headers.map((header) => (
              <TableColumn key={header.fieldName}>
                {rowItem[header.fieldName]}
              </TableColumn>
            ))}
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}
export default ProjectListTable;
