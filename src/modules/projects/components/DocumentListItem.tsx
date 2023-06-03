import styled from "styled-components";

import { ReactComponent as DocFileIcon } from "../../../assets/icons/fileTypes/docFileIcon.svg";
import { ReactComponent as DocXFileIcon } from "../../../assets/icons/fileTypes/docXFileIcon.svg";
import { ReactComponent as JpgFileIcon } from "../../../assets/icons/fileTypes/jpgFileIcon.svg";
import { ReactComponent as PdfFileIcon } from "../../../assets/icons/fileTypes/pdfFileIcon.svg";
import { ReactComponent as PngFileIcon } from "../../../assets/icons/fileTypes/pngFileIcon.svg";
import { ReactComponent as PptFileIcon } from "../../../assets/icons/fileTypes/pptFileIcon.svg";
import { ReactComponent as PptxFileIcon } from "../../../assets/icons/fileTypes/pptxFileIcon.svg";
import { ReactComponent as XlsFileIcon } from "../../../assets/icons/fileTypes/xlsFileIcon.svg";
import { ReactComponent as XlsxFileIcon } from "../../../assets/icons/fileTypes/xlsxFileIcon.svg";
import { ReactComponent as DownloadIcon } from "../../../assets/icons/generic/download.svg";
import { ReactComponent as FileIcon } from "../../../assets/icons/generic/file.svg";
import { ReactComponent as InfoIcon } from "../../../assets/icons/generic/info.svg";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import { convertToDateTimeFormat } from "../../../utils/dateTimeFormatter";

const DocumentItemContainer = styled.div`
  justify-content: left;
  align-items: center;
  display: flex;
  height: 84px;
  width: 100%;
  gap: 8px;
  border-bottom: 1px solid #e1e4e8;
  padding-right: 8px;
`;

const FlexBox = styled.div.attrs((props: { gap: string }) => props)`
  display: flex;
  gap: ${(props) => props.gap};
  align-items: center;
`;

const DocumentDetails = styled.div`
  flex-grow: 1;
  cursor: default;
`;

const DotDivider = styled.div`
  width: 4px;
  height: 4px;
  background-color: #c4c9d1;
  border-radius: 50%;
`;

export interface DocumentInfo {
  fileFormat: string;
  date: string;
  source?: string;
  name: string;
  size: string;
  id: string;
}

export default function DocumentListItem({
  documentInfo,
  onClickDownload,
  onGetInfo,
}: {
  documentInfo: DocumentInfo;
  onClickDownload: (id: string, name: string, extension: string) => void;
  onGetInfo?: (id: string) => void;
}) {
  const fileFormatIcon = {
    png: <PngFileIcon />,
    doc: <DocFileIcon />,
    docx: <DocXFileIcon />,
    jpg: <JpgFileIcon />,
    ppt: <PptFileIcon />,
    pptx: <PptxFileIcon />,
    xls: <XlsFileIcon />,
    xlsx: <XlsxFileIcon />,
    pdf: <PdfFileIcon />,
  }[documentInfo.fileFormat];

  return (
    <DocumentItemContainer>
      <FlexBox>{fileFormatIcon || <FileIcon />}</FlexBox>

      <DocumentDetails>
        <div style={{ marginBottom: "4px" }}>
          <Text type="bodyBold" color="default">
            {documentInfo.name}
          </Text>
        </div>

        <FlexBox gap="4px">
          <Text type="caption" color="subdued">
            {convertToDateTimeFormat(documentInfo.date)}
          </Text>

          <DotDivider />

          <Text type="caption" color="subdued">
            {documentInfo.size}
          </Text>

          {documentInfo.source && (
            <>
              <DotDivider />
              <Text type="caption" color="subdued">
                {documentInfo.source}
              </Text>
            </>
          )}
        </FlexBox>
      </DocumentDetails>

      <FlexBox gap="8px">
        {onGetInfo && (
          <Button
            type="secondary"
            isIcon={true}
            onClick={() => onGetInfo(documentInfo.id)}
          >
            <InfoIcon />
          </Button>
        )}

        <Button
          type="secondary"
          isIcon={true}
          onClick={() =>
            onClickDownload(
              documentInfo.id,
              documentInfo.name,
              documentInfo.fileFormat,
            )
          }
        >
          <DownloadIcon />
        </Button>
      </FlexBox>
    </DocumentItemContainer>
  );
}
