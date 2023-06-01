import { useState } from "react";
import styled from "styled-components";

import { DocumentList } from "./DocumentList";
import { DocumentInfo } from "./DocumentListItem";
import Accordion from "../../../components/Accordion";
import Icon from "../../../components/Icon";
import { SidePanel } from "../../../components/SidePanel";
import Text from "../../../components/Text";

export interface DocumentDetails {
  name: string;
  projectId: number;
  engagement: string;
  documentName: string;
  state: string;
  fileFormat: string;
  size: string;
  source: string;
  registryApprovalDate: Date;
}

export interface VersionHistory {
  id: string;
  name: string;
  documentId: string;
  version: number;
  updatedAt: Date;
  size: string;
  fileFormat: string;
}

const DocInfoHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 18px;
  gap: 10px;
`;

const DocDetailParameter = styled.div`
  display: flex;
  flex-direction: column;
`;

const DocDetailContainer = styled.div`
  padding: 10px;
`;

function DocumentInformation({
  documentDetails,
  versionHistory,
}: {
  documentDetails: DocumentDetails;
  versionHistory: VersionHistory[];
}) {
  const [openDocDetails, setOpenDocDetails] = useState(false);
  const [openVersionHistory, setOpenVersionHistory] = useState(false);
  //   const documentDetails = {
  //     name: "Project for Conservation",
  //     projectId: 12345,
  //     engagement: "Feasibility Study",
  //     documentName: "Detailed project report",
  //     state: "Active",
  //     fileFormat: "PDF",
  //     size: "1.3 MB",
  //     source: "Consulant",
  //     registryApprovalDate: new Date(),
  //   };

  const toggleDocDetailsAccordion = () => {
    setOpenDocDetails(!openDocDetails);
    setOpenVersionHistory(false);
  };

  const toggleVersionHistoryAccordion = () => {
    setOpenVersionHistory(!openVersionHistory);
    setOpenDocDetails(false);
  };
  const renderDocumentDetails = () => {
    return (
      <DocDetailContainer>
        <DocDetailParameter>
          <Text type="smallText" color="subdued">
            {"Project Name"}
          </Text>
          <Text type="body" color="default">
            {documentDetails.name}
          </Text>
        </DocDetailParameter>
        <br />
        <DocDetailParameter>
          <Text type="smallText" color="subdued">
            {"Project ID"}
          </Text>
          <Text type="body" color="default">
            {documentDetails.projectId}
          </Text>
        </DocDetailParameter>
        <br />
        <DocDetailParameter>
          <Text type="smallText" color="subdued">
            {"Engagement"}
          </Text>
          <Text type="body" color="default">
            {documentDetails.engagement}
          </Text>
        </DocDetailParameter>
        <br />
        <DocDetailParameter>
          <Text type="smallText" color="subdued">
            {"Document name"}
          </Text>
          <Text type="body" color="default">
            {documentDetails.documentName}
          </Text>
        </DocDetailParameter>
        <br />
        <DocDetailParameter>
          <Text type="smallText" color="subdued">
            {"State"}
          </Text>
          <Text type="body" color="default">
            {documentDetails.state}
          </Text>
        </DocDetailParameter>
        <br />
        <DocDetailParameter>
          <Text type="smallText" color="subdued">
            {"File Format"}
          </Text>
          <Text type="body" color="default">
            {documentDetails.fileFormat}
          </Text>
        </DocDetailParameter>
        <br />
        <DocDetailParameter>
          <Text type="smallText" color="subdued">
            {"Size"}
          </Text>
          <Text type="body" color="default">
            {documentDetails.size}
          </Text>
        </DocDetailParameter>
        <br />
        <DocDetailParameter>
          <Text type="smallText" color="subdued">
            {"Source"}
          </Text>
          <Text type="body" color="default">
            {documentDetails.source}
          </Text>
        </DocDetailParameter>
        <br />
        <DocDetailParameter>
          <Text type="smallText" color="subdued">
            {"Registry approval date"}
          </Text>
          <Text type="body" color="default">
            {documentDetails.registryApprovalDate.toString()}
          </Text>
        </DocDetailParameter>
      </DocDetailContainer>
    );
  };

  const renderVersionHistory = () => {
    return (
      <DocumentList
        data={versionHistory}
        // onClickDownload={downloadFile}
        // onGetInfo={goToDetailsPage}
      />
    );
  };

  return (
    <SidePanel isOn={true}>
      <DocInfoHeader>
        <Icon name="information" />

        <Text type="heading3" color="default">
          {"Document Information"}
        </Text>
      </DocInfoHeader>
      <Accordion
        isOpen={openDocDetails}
        title={"Document details"}
        toggleAccordion={toggleDocDetailsAccordion}
      >
        {renderDocumentDetails()}
      </Accordion>
      <Accordion
        isOpen={openVersionHistory}
        toggleAccordion={toggleVersionHistoryAccordion}
        title={"Version History"}
      >
        {renderVersionHistory()}
      </Accordion>
    </SidePanel>
  );
}

export default DocumentInformation;
