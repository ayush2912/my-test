import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useState, useEffect } from "react";
import styled from "styled-components";

import TEST from "./Testing Docs.pdf";

export interface IDocumentDetails {
  name: string | null;
  projectId: number | null;
  engagement: string | null;
  documentName: string | null;
  state: string | null;
  fileFormat: string | null;
  size: string | null;
  source: string | null;
  registryApprovalDate: Date | null;
}

function DocumentPreview({
  documentDetails,
}: {
  documentDetails: IDocumentDetails;
}) {
  // const blobDocs = [
  //   new Blob([TEST], { type: "application/pdf" }),
  //   new Blob(["Imagecontent 3"], { type: "image/png" }),
  // ];

  const url =
    "https://offsetmax-documents-development.s3.ap-south-1.amazonaws.com/1686569330955.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIASOVJXKXEIX3KPSED%2F20230615%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230615T054446Z&X-Amz-Expires=3600&X-Amz-Signature=55d92065d8456aa3af07e699177827fd34de11e0db22f94d2f9ecbac9bf7efb2&X-Amz-SignedHeaders=host&x-id=GetObject";

  const docsS3 = [
    {
      uri: "https://offsetmax-documents-development.s3.ap-south-1.amazonaws.com/1686569330955.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIASOVJXKXEIX3KPSED%2F20230615%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230615T054446Z&X-Amz-Expires=3600&X-Amz-Signature=55d92065d8456aa3af07e699177827fd34de11e0db22f94d2f9ecbac9bf7efb2&X-Amz-SignedHeaders=host&x-id=GetObject",
    },
    {
      uri: "https://offsetmax-documents-development.s3.ap-south-1.amazonaws.com/1686569330955.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIASOVJXKXEIX3KPSED%2F20230615%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230615T054446Z&X-Amz-Expires=3600&X-Amz-Signature=55d92065d8456aa3af07e699177827fd34de11e0db22f94d2f9ecbac9bf7efb2&X-Amz-SignedHeaders=host&x-id=GetObject",
    },
    {
      uri: "https://offsetmax-documents-development.s3.ap-south-1.amazonaws.com/1686569330955.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIASOVJXKXEIX3KPSED%2F20230615%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230615T054446Z&X-Amz-Expires=3600&X-Amz-Signature=55d92065d8456aa3af07e699177827fd34de11e0db22f94d2f9ecbac9bf7efb2&X-Amz-SignedHeaders=host&x-id=GetObject",
    },
  ];

  const docsNormal = [
    {
      uri: "https://offsetmax-documents-service-dev-japrkvsz2a-em.a.run.app/documents/6486fc8809325e73613ac943/download",
    },
  ];

  const [blobs, setBlobs] = useState([]);

  useEffect(() => {
    const fetchBlobs = async () => {
      for (const doc of docsNormal) {
        const res = await fetch(doc.uri);
        // console.log("=========== ", res);
        const blobb = await res.blob();
        console.log("BLOBBB     ", window.URL.createObjectURL(blobb));
        setBlobs((oldArray) => [...oldArray, blobb]);
      }
    };
    fetchBlobs();
  }, []);

  console.log("============   ", blobs);

  return (
    <>
      {/* {blobs.length && ( */}
      <DocViewer
        documents={blobs.map((file) => ({
          uri: window.URL.createObjectURL(file),
          fileName: file.name,
        }))}
        prefetchMethod="GET"
        pluginRenderers={DocViewerRenderers}
        // initialActiveDocument={docs[0]}
      />
      {/* )} */};<h1>dsada</h1>
    </>
  );
}

export default DocumentPreview;
