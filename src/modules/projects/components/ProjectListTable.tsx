import Flag from "react-world-flags";
import styled from "styled-components";

import EyeButton from "../../../components/EyeButton";
import Icon, { IconNameType } from "../../../components/Icon";
import EngagementTable from "../../../components/Table";
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
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: pre-wrap;
  max-height: 50px;
`;

const FlagHolder = styled.div`
  height: 12px;
  width: 22px;
`;

export interface ProjectRowItem {
  id: string;
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
    isOverdue: boolean;
  };
}

export interface Headers {
  name: string;
  fieldName: string;
}

function ProjectListTable({
  headers,
  tableData,
  onViewButton,
}: {
  headers: Headers[];
  tableData: ProjectRowItem[];
  onViewButton: (id: string) => void;
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
        <>
          <div style={{ display: "flex", gap: "10px" }}>
            {v.countries.map((country) => (
              <FlagHolder key={country?.iso3Name}>
                <Flag code={country?.iso3Name} />
              </FlagHolder>
            ))}
          </div>
        </>
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
            <Icon
              name={selectedIconName}
              color={v.engagement.isOverdue ? "#E0A008" : ""}
            />
            <Text type="bodyBold" color="default">
              {v.engagement.type}
            </Text>
          </div>
          <div style={{ marginLeft: "25px" }}>
            <Text type="caption" color="subdued">
              {convertToEuropeanDateFormat(v.engagement.dueDate)}
            </Text>
          </div>
        </Content>
      ),
      viewButton: <EyeButton onClick={() => onViewButton(v.id)} />,
    };
  };
  return (
    <EngagementTable
      headers={headers}
      tableData={tableData}
      cellContentMapper={cellContentMapper}
    />
  );
}
export default ProjectListTable;
