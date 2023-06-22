import type { Meta, StoryObj } from "@storybook/react";

import DocumentDetails, { IDocumentDetails } from "./DocumentDetails";

const meta: Meta<typeof DocumentDetails> = {
  component: DocumentDetails,
};

export default meta;

type Story = StoryObj<typeof DocumentDetails>;

const documentDetailsData: IDocumentDetails = {
  name: "Project for Conservation",
  projectId: 12345,
  engagement: "Feasibility Study",
  documentName: "Detailed project report",
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
};

const documentDetailsData2: IDocumentDetails = {
  name: "",
  projectId: null,
  engagement: "",
  documentName: "",
  state: "",
  fileFormat: "",
  size: "",
  source: "",
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
};
export const Default: Story = {
  render: () => <DocumentDetails documentDetails={documentDetailsData} />,
};

export const EmptyState: Story = {
  render: () => <DocumentDetails documentDetails={documentDetailsData2} />,
};
