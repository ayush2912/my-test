import type { Meta, StoryObj } from "@storybook/react";

import DocumentPreview from "./DocumentPreview";

const meta: Meta<typeof DocumentPreview> = {
  component: DocumentPreview,
};

export default meta;
type Story = StoryObj<typeof DocumentPreview>;

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
  uri: string | null;
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
    uri: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Analytics_Quarterly_Review_Q2_2013_%28Research_and_Data%29.pdf",
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
    uri: "https://upload.wikimedia.org/wikipedia/commons/3/36/Battling_Browser_Bugs_for_Fun_and_Non-Profit_%28LCA_2015%29.pdf",
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

export const Default: Story = {
  render: () => (
    <DocumentPreview
      documentDetails={documentDetailsData}
      handleDownload={handleDownload}
    />
  ),
};
