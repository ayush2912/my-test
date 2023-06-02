import styled from "styled-components";

import Text from "../../../components/Text";
import { convertToMonthNameFormat } from "../../../utils/dateTimeFormatter";

export interface DocumentDetail {
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
  documentDetails: DocumentDetails;
}) {
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
          {convertToMonthNameFormat(documentDetails.registryApprovalDate)}
        </Text>
      </DocDetailParameter>
    </DocDetailContainer>
  );
}

export default DocumentDetails;
