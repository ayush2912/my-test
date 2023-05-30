import Flag from "react-world-flags";
import styled from "styled-components";

import { Button, Tooltip } from "../../../components";
import EyeButton from "../../../components/EyeButton";
import Icon, { IconNameType } from "../../../components/Icon";
import Table from "../../../components/Table";
import Text from "../../../components/Text";
import { convertToMonthNameFormat } from "../../../utils/dateTimeFormatter";
import { numberFormatter } from "../../../utils/numberFormatter";

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
  cursor: default;
  width: 100%;
`;

export const ProjectNameColumn = styled.div`
  max-width: 196px;
  max-height: 48px;
`;

export const RegistryColumn = styled.div`
  max-width: 122px;
  max-height: 48px;
`;

export const TypeColumn = styled.div`
  max-width: 126px;
  max-height: 48px;
`;
export const SingleLineColumn = styled.div`
  max-width: 102px;
  max-height: 24px;
`;

export const AssetColumn = styled.div`
  max-width: 132px;
  max-height: 48px;
`;

const FlagHolder = styled.div`
  height: 12px;
  width: 22px;
  display: flex;
  align-content: center;
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
    completedDate?: string;
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
  projectsType,
}: {
  headers: Headers[];
  tableData: ProjectRowItem[];
  onViewButton: (id: string) => void;
  projectsType: string;
}) {
  const emptyStateSubTitle = {
    ACTIVE: "You will be notified when there are any projects to view",
    INACTIVE:
      "Please check the ‘Active’ tab to view projects that are currently active under this account.",
  }[projectsType] as string;

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

    const iconTooltip =
      v.engagement.isOverdue && statusLabel !== "COMPLETED"
        ? "OVERDUE"
        : statusLabel +
          (statusLabel === "COMPLETED" && v.engagement.completedDate
            ? " ON " + convertToMonthNameFormat(v.engagement.completedDate)
            : "");
    return {
      rowId: v.id,
      projectName: (
        <ProjectNameColumn>
          <Tooltip text={v.projectName}>
            <Content>
              <Text type="bodyBold" color="default">
                {v.projectName}
              </Text>
            </Content>
          </Tooltip>
        </ProjectNameColumn>
      ),
      registyNameID: (
        <RegistryColumn>
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
        </RegistryColumn>
      ),
      projectTypeSubtype: (
        <TypeColumn>
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
        </TypeColumn>
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
        <SingleLineColumn>
          <Content>
            <Tooltip text={v.portfolioOwner}>
              <Text type="body" color="subdued">
                {v.portfolioOwner}
              </Text>
            </Tooltip>
          </Content>
        </SingleLineColumn>
      ),
      assetOwners: (
        <AssetColumn>
          <Tooltip text={v.assetOwners.map((owner) => owner.name).join(", ")}>
            <Content>
              <Text type="body" color="subdued">
                {v.assetOwners.map((owner) => owner.name).join(", ")}
              </Text>
            </Content>
          </Tooltip>
        </AssetColumn>
      ),
      annualApproximateCreditVolume: (
        <SingleLineColumn>
          <Content>
            <Text type="body" color="subdued">
              {numberFormatter(v.annualApproximateCreditVolume, 0)}
            </Text>
          </Content>
        </SingleLineColumn>
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
      viewButton: (
        <Button type="secondary" isIcon onClick={() => onViewButton(v.id)}>
          <Icon name="eyeIcon" size="xsmall" />
        </Button>
      ),
    };
  };
  return (
    <>
      <Table
        headers={headers}
        tableData={tableData}
        cellContentMapper={cellContentMapper}
        emptyStateTitle={`No ${projectsType.toLowerCase()} projects`}
        emptyStateSubTitle={emptyStateSubTitle}
      />
    </>
  );
}
export default ProjectListTable;
