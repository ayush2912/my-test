import Flag from "react-world-flags";
import styled from "styled-components";

import { Tooltip } from "../../../components";
import EyeButton from "../../../components/EyeButton";
import Icon, { IconNameType } from "../../../components/Icon";
import Table from "../../../components/Table";
import Text from "../../../components/Text";
import { convertToMonthNameFormat } from "../../../utils/dateTimeFormatter";
import { numberFormatter } from "../../../utils/numberFormatter";

// export const Table = styled.table`
//   width: 100%;
//   border-spacing: 5px 20px;
// `;

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
  cursor: default;
`;

const FlagHolder = styled.div`
  height: 12px;
  width: 22px;
`;

type ProjectStateTypes =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "DISCONTINUED"
  | "COMPLETED"
  | "OVERDUE";

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

    const statusLabel = {
      NOT_STARTED: "NOT STARTED",
      IN_PROGRESS: "IN PROGRESS",
      DISCONTINUED: "DISCONTINUED",
      COMPLETED: "COMPLETED",
      OVERDUE: "OVERDUE",
    }[v.engagement.state] as ProjectStateTypes;

    const iconTooltip = v.engagement.isOverdue
      ? "OVERDUE"
      : statusLabel +
        (statusLabel === "COMPLETED"
          ? " ON " + convertToMonthNameFormat(v.engagement.dueDate)
          : "");
    return {
      projectName: (
        <Tooltip text={v.projectName}>
          <Content>
            <Text type="bodyBold" color="default">
              {v.projectName}
            </Text>
          </Content>
        </Tooltip>
      ),
      registyNameID: (
        <Content>
          <Text type="body" color="subdued">
            {v.registryName}
          </Text>
          <br />
          <Tooltip text={v.registryId}>
            <Text type="body" color="subdued">
              {v.registryId}
            </Text>
          </Tooltip>
        </Content>
      ),
      projectTypeSubtype: (
        <Content>
          <Text type="body" color="subdued">
            {v.projectTypes.map((type) => type).join(", ")}
          </Text>
          <br />
          <Tooltip text={v.subTypes.map((type) => type).join(", ")}>
            <Text type="body" color="subdued">
              {v.subTypes.map((type) => type).join(", ")}
            </Text>
          </Tooltip>
        </Content>
      ),
      coutries: (
        <>
          <div style={{ display: "flex", gap: "10px" }}>
            {v.countries.map((country) => (
              <Tooltip key={country?.iso3Name} text={country?.name}>
                <FlagHolder>
                  <Flag code={country?.iso3Name} />
                </FlagHolder>
              </Tooltip>
            ))}
          </div>
        </>
      ),
      portfolioOwners: (
        <Content>
          <Tooltip text={v.portfolioOwner}>
            <Text type="body" color="subdued">
              {v.portfolioOwner}
            </Text>
          </Tooltip>
        </Content>
      ),
      assetOwners: (
        <Tooltip text={v.assetOwners.map((owner) => owner.name).join(", ")}>
          <Content>
            <Text type="body" color="subdued">
              {v.assetOwners.map((owner) => owner.name).join(", ")}
            </Text>
          </Content>
        </Tooltip>
      ),
      annualApproximateCreditVolume: (
        <Content>
          <Text type="body" color="subdued">
            {numberFormatter(v.annualApproximateCreditVolume, 0)}
          </Text>
        </Content>
      ),
      engagement: (
        <div>
          <div style={{ display: "flex", alignContent: "center" }}>
            <Tooltip text={iconTooltip}>
              <Icon
                name={selectedIconName}
                color={v.engagement.isOverdue ? "#E0A008" : ""}
              />
            </Tooltip>
            <Tooltip text={v.engagement.type}>
              <Text type="bodyBold" color="default">
                {v.engagement.type}
              </Text>
            </Tooltip>
          </div>
          <div style={{ marginLeft: "25px" }}>
            <Text type="caption" color="subdued">
              {convertToMonthNameFormat(v.engagement.dueDate)}
            </Text>
          </div>
        </div>
      ),
      viewButton: <EyeButton onClick={() => onViewButton(v.id)} />,
    };
  };
  return (
    <Table
      headers={headers}
      tableData={tableData}
      cellContentMapper={cellContentMapper}
    />
  );
}
export default ProjectListTable;
