import DocumentListItem, { DocumentInfo } from "./DocumentListItem";

export type IDocumentList = DocumentInfo[];

export const DocumentList = ({
  data, // Document List Page in old project, map
  onClickDownload, // function take in document id, to download file
  onGetInfo, // function to take in document id, to navigate (old project)
}: {
  data: IDocumentList;
  onClickDownload: (id: string, name: string, extension: string) => void;
  onGetInfo: (id: string) => void;
}) => {
  return (
    <>
      {data.map((v) => {
        return (
          <DocumentListItem
            key={v.id}
            documentInfo={v}
            onClickDownload={onClickDownload}
            onGetInfo={onGetInfo}
          />
        );
      })}
    </>
  );
};