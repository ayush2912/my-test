import type { Meta, StoryObj } from "@storybook/react";

import DocumentDetails, { IDocumentDetails } from "./DocumentDetails";

const meta: Meta<typeof DocumentDetails> = {
  title: "Projects/Components/Document Details",
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
};

export const Default: Story = {
  render: () => <DocumentDetails documentDetails={documentDetailsData} />,
};