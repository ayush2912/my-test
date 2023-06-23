import type { Meta, StoryFn } from "@storybook/react";

import DocumentPreview from "./DocumentPreview";

export default {
  title: "modules/projects/components/DocumentPreview",
  component: DocumentPreview,
} as Meta;

interface DocumentInfo {
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

const documentDetailsData: IDocumentDetails[] = [
  {
    name: "Project for Conservation",
    projectId: 12345,
    engagement: "Feasibility Study",
    documentName: "Research & Data",
    state: "Active",
    fileFormat: "pdf",
    size: "1.1 MB",
    source: "Consulant",
    registryApprovalDate: new Date(),
    uri: "https://dev-documents.offsetmax.digital/documents/648686da6902cd12fa662588/download",
    versionHistory: [
      {
        fileFormat: "pdf",
        date: "2023-06-12T12:35:12.958Z",
        source: "Client",
        name: "Version 2",
        size: "1.9 MB",
        id: "64871100c0c09a08fc637539",
      },
      {
        fileFormat: "pdf",
        date: "2023-07-10T12:35:12.958Z",
        source: "Client",
        name: "Version 1",
        size: "2.3 MB",
        id: "64871100c0c09a08fc637539",
      },
    ],
  },
  {
    name: "Test Project",
    projectId: 12345,
    engagement: "Carbon Shop",
    documentName: "Tales from Trenches",
    state: "Active",
    fileFormat: "pdf",
    size: "2.3 MB",
    source: "Client",
    registryApprovalDate: new Date(),
    uri: "https://dev-documents.offsetmax.digital/documents/648686da6902cd12fa662586/download",
    versionHistory: [
      {
        fileFormat: "pdf",
        date: "2023-06-12T12:35:12.958Z",
        source: "Consultant",
        name: "Version 2",
        size: "2.1 MB",
        id: "64871100c0c09a08fc637539",
      },
      {
        fileFormat: "pdf",
        date: "2023-07-10T12:35:12.958Z",
        source: "Consultant",
        name: "Version 1",
        size: "23.3 MB",
        id: "64871100c0c09a08fc637539",
      },
    ],
  },
];

const handleDownload = () => {
  console.log("DOWNLOADING !!!");
};

const Template: StoryFn<{
  documentDetails: IDocumentDetails[];
}> = (args) => <DocumentPreview {...args} handleDownload={handleDownload} />;

export const Default = Template.bind({});
Default.args = {
  documentDetails: documentDetailsData,
};
