import styled from "styled-components";

import { DocumentInfo } from "./DocumentPreview";
import Text from "../../../components/Text";
import { convertToMonthNameFormat } from "../../../utils/dateTimeFormatter";

export interface IDocumentDetails {
  name: string | null;
  projectId: number | null;
  engagement: string | null;
  documentName: string | null;
  state: string | null;
  fileFormat: string;
  size: string | null;
  source: string | null;
  registryApprovalDate: Date | string;
  uri: string | null;
  versionHistory: DocumentInfo[];
}

const DocDetailParameter = styled.div`
  display: flex;
  flex-direction: column;
`;

const DocDetailContainer = styled.div`
  padding: 8px;
`;

function DocumentDetails({
  documentDetails,
}: {
  documentDetails: IDocumentDetails;
}) {
  return (
    <DocDetailContainer>
      <DocDetailParameter>
        <Text type="caption" color="subdued">
          {"Project Name"}
        </Text>
        <Text type="body" color="default">
          {documentDetails.name ? documentDetails.name : "-"}
        </Text>
      </DocDetailParameter>
      <br />
      <DocDetailParameter>
        <Text type="caption" color="subdued">
          {"Project ID"}
        </Text>
        <Text type="body" color="default">
          {documentDetails.projectId ? documentDetails.projectId : "-"}
        </Text>
      </DocDetailParameter>
      <br />
      <DocDetailParameter>
        <Text type="caption" color="subdued">
          {"Engagement"}
        </Text>
        <Text type="body" color="default">
          {documentDetails.engagement ? documentDetails.engagement : "-"}
        </Text>
      </DocDetailParameter>
      <br />
      <DocDetailParameter>
        <Text type="caption" color="subdued">
          {"Document name"}
        </Text>
        <Text type="body" color="default">
          {documentDetails.documentName ? documentDetails.documentName : "-"}
        </Text>
      </DocDetailParameter>
      <br />
      <DocDetailParameter>
        <Text type="caption" color="subdued">
          {"State"}
        </Text>
        <Text type="body" color="default">
          {documentDetails.state ? documentDetails.state : "-"}
        </Text>
      </DocDetailParameter>
      <br />
      <DocDetailParameter>
        <Text type="caption" color="subdued">
          {"File Format"}
        </Text>
        <Text type="body" color="default">
          {documentDetails.fileFormat ? documentDetails.fileFormat : "-"}
        </Text>
      </DocDetailParameter>
      <br />
      <DocDetailParameter>
        <Text type="caption" color="subdued">
          {"Size"}
        </Text>
        <Text type="body" color="default">
          {documentDetails.size ? documentDetails.size : "-"}
        </Text>
      </DocDetailParameter>
      <br />
      <DocDetailParameter>
        <Text type="caption" color="subdued">
          {"Source"}
        </Text>
        <Text type="body" color="default">
          {documentDetails.source ? documentDetails.source : "-"}
        </Text>
      </DocDetailParameter>
      <br />
      <DocDetailParameter>
        <Text type="caption" color="subdued">
          {"Registry approval date"}
        </Text>

        <Text type="body" color="default">
          {documentDetails.registryApprovalDate
            ? convertToMonthNameFormat(documentDetails.registryApprovalDate)
            : "-"}
        </Text>
      </DocDetailParameter>
    </DocDetailContainer>
  );
}

export default DocumentDetails;
