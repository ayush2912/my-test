import DocViewer, {
  DocViewerRenderers,
  IHeaderOverride,
} from "@cyntler/react-doc-viewer";
import { useEffect, useState, useMemo } from "react";
import styled from "styled-components";

import DocumentDetails from "./DocumentDetails";
import { DocumentList } from "./DocumentList";
import Accordion from "../../../../src/components/Accordion";
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
import Icon from "../../../components/Icon";
import Text from "../../../components/Text";
import { convertToDateTimeFormat } from "../../../utils/dateTimeFormatter";

export interface DocumentInfo {
  fileFormat: string;
  date: string;
  source?: string;
  name: string;
  size: string;
  id: string;
}

interface IDocumentDetails {
  name: string | null;
  projectId: number | null;
  engagement: string | null;
  documentName: string | null;
  state: string | null;
  fileFormat: string;
  size: string | null;
  source: string | null;
  registryApprovalDate: Date | string;
  uri: string;
  versionHistory: DocumentInfo[];
}

const HeaderContainer = styled.div`
  background-color: white;
  box-shadow: 0px 8px 64px rgba(15, 34, 67, 0.06),
    0px 0px 1px rgba(15, 34, 67, 0.08);
  padding: 20px 24px;
`;

const StyledHr = styled.hr`
  border: none;
  height: 1px;
  background-color: #e1e4e8;
`;

const FlexContainer = styled.div<{ openSidebar: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ openSidebar }) =>
    openSidebar ? "unset" : "space-between"};
  gap: ${({ openSidebar }) => (openSidebar ? "11px" : "0")};
  margin-bottom: ${({ openSidebar }) => (openSidebar ? "24px" : "0")};
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

const ChevronIconStyles = styled.div<{ openSidebar: boolean }>`
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  position: absolute;
  top: 50px;
  left: -13px;
  transform: ${(props) => (props.openSidebar ? `rotate(180deg)` : "")};
  box-shadow: 1px 1px 4px rgba(0, 30, 53, 0.1);
  cursor: pointer;
`;

const InfoIconStyles = styled.div`
  margin: 50px 0 0 23px;
`;

const DocPreviewContainer = styled.div`
  width: 90%;
`;

const Drawer = styled.div<{ openSidebar: boolean }>`
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  right: 0px;
  background: white;
  transition: right 300ms ease-in-out;
  border: 1px solid #e7e7e7;
  overflow-y: scroll;
  width: ${({ openSidebar }) => (openSidebar ? "464px" : "72px")};
`;

type FileFormat =
  | "png"
  | "doc"
  | "docx"
  | "jpg"
  | "jpeg"
  | "ppt"
  | "pptx"
  | "xls"
  | "xlsx"
  | "pdf";
const fileFormatIcon: Record<FileFormat, JSX.Element> = {
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
};

function DocumentPreview({
  documentDetails,
  handleDownload,
}: {
  documentDetails: IDocumentDetails[];
  handleDownload: () => void;
}) {
  useEffect(() => {
    document.body.style.background = "rgb(241 242 244 / 0.5)";

    return () => {
      document.body.style.background = "white";
    };
  });

  const [zoom, setZoom] = useState(1);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openDocDetails, setOpenDocDetails] = useState(false);
  const [openVersionHistory, setOpenVersionHistory] = useState(false);
  const [documents, setDocuments] = useState<{ uri: string }[]>([]);
  const [currentDocIndex, setCurrentDocIndex] = useState<number>(0);

  useEffect(() => {
    const docsNormal = documentDetails.map((obj) => ({ uri: obj.uri }));
    setDocuments(docsNormal);
  }, []);

  const toggleDocDetailAccordion = () => {
    setOpenDocDetails(!openDocDetails);
    setOpenVersionHistory(false);
  };

  const toggleVersionHistoryAccordion = () => {
    setOpenVersionHistory(!openVersionHistory);
    setOpenDocDetails(false);
  };

  const onClickZoomIn = () => {
    setZoom(zoom + 0.1);
  };

  const onClickZoomOut = () => {
    if (zoom > 1) setZoom(zoom - 0.1);
  };

  const onClickFit = () => {
    setZoom(1);
  };

  const handleChevronClick = () => {
    setOpenSidebar(!openSidebar);
  };

  const DocumentPreviewHeader: IHeaderOverride = (
    state,
    previousDocument,
    nextDocument,
  ) => {
    if (!state.currentDocument || state.config?.header?.disableFileName) {
      return null;
    }
    const currentFileNo = state.currentFileNo;
    const currentFormat = documentDetails[currentFileNo].fileFormat;

    useEffect(() => {
      setCurrentDocIndex(currentFileNo);
    }, [currentFileNo]);

    return (
      <>
        <HeaderContainer>
          <FlexContainer openSidebar={false}>
            <DocInfoContainer>
              <div>
                {fileFormatIcon[currentFormat as FileFormat] || <FileIcon />}
              </div>
              <div>
                <Text type="bodyBold" color="default">
                  {documentDetails[currentFileNo].documentName}
                </Text>
                <FlexContainer openSidebar={false}>
                  <Text type="caption" color="subdued">
                    {documentDetails[currentFileNo].size}
                  </Text>
                  <DotDivider />
                  <Text type="caption" color="subdued">
                    {convertToDateTimeFormat(
                      documentDetails[currentFileNo].registryApprovalDate,
                    )}
                  </Text>
                  <DotDivider />
                  <Text type="caption" color="subdued">
                    {documentDetails[currentFileNo].source}
                  </Text>
                </FlexContainer>
              </div>
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
                {`Document ${currentFileNo + 1}/${state.documents.length}`}
              </Text>
              <Button
                type="secondary"
                isIconButton={true}
                lightBorderColor
                size="large"
                onClick={previousDocument}
              >
                <ArrowLeftIcon />
              </Button>
              <Button
                type="secondary"
                isIconButton={true}
                lightBorderColor
                size="small"
                onClick={nextDocument}
              >
                <ArrowRightIcon />
              </Button>
            </FlexContainerDocActions>
          </FlexContainer>
        </HeaderContainer>
      </>
    );
  };

  const configMemoObj = useMemo(() => {
    return {
      header: {
        overrideComponent: DocumentPreviewHeader,
      },
      pdfVerticalScrollByDefault: true,
      pdfZoom: {
        defaultZoom: zoom,
        zoomJump: 0.1,
      },
    };
  }, [zoom]);

  return (
    <div>
      <DocPreviewContainer>
        <DocViewer
          config={configMemoObj}
          documents={documents}
          prefetchMethod="GET"
          pluginRenderers={DocViewerRenderers}
          initialActiveDocument={documents[currentDocIndex]}
        />
      </DocPreviewContainer>

      <Drawer openSidebar={openSidebar}>
        {" "}
        <ChevronIconStyles
          onClick={handleChevronClick}
          openSidebar={openSidebar}
        >
          <Icon name="chevronsLeft" />
        </ChevronIconStyles>
        <InfoIconStyles>
          <FlexContainer openSidebar={openSidebar}>
            <Icon name="information" />

            {openSidebar && (
              <Text type="heading3">{"Document information"}</Text>
            )}
          </FlexContainer>
          <div>
            {openSidebar && (
              <>
                <Accordion
                  title="Document details"
                  isOpen={openDocDetails}
                  toggleAccordion={toggleDocDetailAccordion}
                >
                  <DocumentDetails
                    documentDetails={documentDetails[currentDocIndex]}
                  />
                </Accordion>
                <Accordion
                  title="Version history"
                  isOpen={openVersionHistory}
                  toggleAccordion={toggleVersionHistoryAccordion}
                >
                  <StyledHr />
                  <DocumentList
                    onClickDownload={handleDownload}
                    data={documentDetails[currentDocIndex].versionHistory}
                  />
                </Accordion>
              </>
            )}
          </div>
        </InfoIconStyles>
      </Drawer>
    </div>
  );
}

export default DocumentPreview;
