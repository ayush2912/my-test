import DocViewer, {
  DocViewerRenderers,
  IHeaderOverride,
} from "@cyntler/react-doc-viewer";
import { useState } from "react";
import styled from "styled-components";

import { ReactComponent as ArrowLeftIcon } from "../../../assets/icons/arrows/arrow-left.svg";
import { ReactComponent as ArrowRightIcon } from "../../../assets/icons/arrows/arrow-right.svg";
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
import { ReactComponent as FullScreenIcon } from "../../../assets/icons/generic/full-screen.svg";
import { ReactComponent as ZoomInIcon } from "../../../assets/icons/generic/zoom-in.svg";
import { ReactComponent as ZoomOutIcon } from "../../../assets/icons/generic/zoom-out.svg";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import { convertToDateTimeFormat } from "../../../utils/dateTimeFormatter";

export interface IDocumentDetails {
  documentName: string | null;
  fileFormat: string;
  size: string | null;
  source: string | null;
  date: Date | string;
}

const HeaderContainer = styled.div`
  background-color: white;
  box-shadow: 0px 8px 64px rgba(15, 34, 67, 0.06),
    0px 0px 1px rgba(15, 34, 67, 0.08);
  border: 1px solid red;
  padding: 20px 0px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FlexContainerDocActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const DocInfoContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const DotDivider = styled.div`
  width: 4px;
  height: 4px;
  background-color: #c4c9d1;
  border-radius: 50%;
  margin: 0 4px;
`;

function DocumentPreview({
  documentDetails,
  handleDownload,
  handleLeftClick,
  handleRightClick,
}: {
  documentDetails: IDocumentDetails;
  handleDownload: () => void;
  handleLeftClick: () => void;
  handleRightClick: () => void;
}) {
  const fileFormatIcon = {
    png: <PngFileIcon />,
    doc: <DocFileIcon />,
    docx: <DocXFileIcon />,
    jpg: <JpgFileIcon />,
    jpeg: <JpgFileIcon />,
    ppt: <PptFileIcon />,
    pptx: <PptxFileIcon />,
    xls: <XlsFileIcon />,
    xlsx: <XlsxFileIcon />,
    pdf: <PdfFileIcon />,
  }[documentDetails.fileFormat];

  const docsNormal = [
    {
      uri: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Analytics_Quarterly_Review_Q2_2013_%28Research_and_Data%29.pdf",
    },
    {
      uri: "https://upload.wikimedia.org/wikipedia/commons/3/36/Battling_Browser_Bugs_for_Fun_and_Non-Profit_%28LCA_2015%29.pdf",
    },
  ];

  const [zoom, setZoom] = useState(1);

  const onClickZoomIn = () => {
    setZoom(zoom + 0.1);
  };

  const onClickZoomOut = () => {
    if (zoom > 1) setZoom(zoom - 0.1);
  };

  const onClickFit = () => {
    setZoom(1);
  };

  const MyHeader: IHeaderOverride = (state, previousDocument, nextDocument) => {
    if (!state.currentDocument || state.config?.header?.disableFileName) {
      return null;
    }

    return (
      <>
        <HeaderContainer>
          <FlexContainer>
            <DocInfoContainer>
              <div>{fileFormatIcon || <FileIcon />}</div>
              <div>
                <Text type="bodyBold" color="default">
                  {documentDetails.documentName}
                </Text>
                <FlexContainer>
                  <Text type="caption" color="subdued">
                    {documentDetails.size}
                  </Text>
                  <DotDivider />
                  <Text type="caption" color="subdued">
                    {convertToDateTimeFormat(documentDetails.date)}
                  </Text>
                  <DotDivider />
                  <Text type="caption" color="subdued">
                    {documentDetails.source}
                  </Text>
                </FlexContainer>
              </div>
              {/* <div>{state.currentDocument.uri || ""}</div>
          <div>
            <button
              onClick={previousDocument}
              disabled={state.currentFileNo === 0}
            >
              Previous Document
            </button>
            <button
              onClick={nextDocument}
              disabled={state.currentFileNo >= state.documents.length - 1}
            >
              Next Document
            </button>
          </div> */}
            </DocInfoContainer>

            <FlexContainerDocActions>
              <Button
                type="secondary"
                isIconButton={true}
                lightBorderColor
                size="large"
                onClick={handleDownload}
              >
                <DownloadIcon />
              </Button>
              <Button
                type="secondary"
                isIconButton={true}
                lightBorderColor
                size="large"
                onClick={onClickZoomOut}
              >
                <ZoomOutIcon />
              </Button>
              <Button
                type="secondary"
                isIconButton={true}
                lightBorderColor
                size="large"
                onClick={onClickZoomIn}
              >
                <ZoomInIcon />
              </Button>
              <Button
                type="secondary"
                isIconButton={true}
                lightBorderColor
                size="large"
                onClick={onClickFit}
              >
                <FullScreenIcon />
              </Button>
              <Text type="body" color="subdued">
                {`Document 1/50`}
              </Text>
              <Button
                type="secondary"
                isIconButton={true}
                lightBorderColor
                size="large"
                onClick={handleLeftClick}
              >
                <ArrowLeftIcon />
              </Button>
              <Button
                type="secondary"
                isIconButton={true}
                lightBorderColor
                size="small"
                onClick={handleRightClick}
              >
                <ArrowRightIcon />
              </Button>
            </FlexContainerDocActions>
          </FlexContainer>
        </HeaderContainer>
      </>
    );
  };

  return (
    <>
      <DocViewer
        config={{
          header: {
            overrideComponent: MyHeader,
          },
          pdfVerticalScrollByDefault: true,
          pdfZoom: {
            defaultZoom: zoom,
            // zoomJump:  zoom },
          },
        }}
        documents={docsNormal}
        prefetchMethod="GET"
        pluginRenderers={DocViewerRenderers}
      />
      <h1>dsada</h1>
    </>
  );
}

export default DocumentPreview;
