import { useState } from "react";
import styled from "styled-components";

import { DocumentList } from "./DocumentList";
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
  padding: 15px 15px 15px 5px;
  gap: 15px;
  align-items: flex-end;
`;

const DocDetailParameter = styled.div`
  display: flex;
  flex-direction: column;
`;

const DocDetailContainer = styled.div`
  padding: 8px;
`;

const SidePanelContainer = styled.div`
  padding: 10px;
`;

const StyledHr = styled.hr`
  border: none;
  height: 1px;
  background-color: #e1e4e8;
`;

const LeftArrowIconWrapper = styled.div`
  cursor: pointer;
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
      <div>
        <DocumentList
          data={versionHistory}
          // onClickDownload={downloadFile}
          // onGetInfo={goToDetailsPage}
        />
      </div>
    );
  };

  return (
    <SidePanel isOn={true}>
      <SidePanelContainer>
        <DocInfoHeader>
          <LeftArrowIconWrapper>
            <Icon name="arrowLeft" size="xsmall" />
          </LeftArrowIconWrapper>

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
          <StyledHr />
          {/* <hr /> */}
          {renderVersionHistory()}
        </Accordion>
        {!openVersionHistory ? <StyledHr /> : null}
      </SidePanelContainer>
    </SidePanel>
  );
}

export default DocumentInformation;
