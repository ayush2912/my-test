import type { Meta, StoryObj } from "@storybook/react";

import DocumentInformation, {
  DocumentDetails,
  VersionHistory,
} from "./DocumentInformation";

const meta: Meta<typeof DocumentInformation> = {
  title: "Projects/Components/DocumentInformation",
  component: DocumentInformation,
};

export default meta;

type Story = StoryObj<typeof DocumentInformation>;

const versionHistoryData: VersionHistory[] = [
  {
    id: "6438f5f51725504e53c94356",
    documentId: "6438f5f51725504e53c94347",
    version: 4,
    name: "Version 4",
    updatedAt: new Date(),
    size: "1.5 MB",
    fileFormat: "pdf",
  },
  {
    id: "6438f5f51725504e53c94356",
    documentId: "6438f5f51725504e53c94347",
    version: 3,
    name: "Version 3",
    updatedAt: new Date(),
    size: "1.3 MB",
    fileFormat: "pdf",
  },
  {
    id: "6438f5f51725504e53c94356",
    documentId: "6438f5f51725504e53c94347",
    version: 2,
    name: "Version 2",
    updatedAt: new Date(),
    size: "1.5 MB",
    fileFormat: "pdf",
  },
  {
    id: "6438f5f51725504e53c94356",
    documentId: "6438f5f51725504e53c94347",
    version: 1,
    name: "Version 1",
    updatedAt: new Date(),
    size: "2 MB",
    fileFormat: "pdf",
  },
];

const documentDetailsData: DocumentDetails = {
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

export const Primary: Story = {
  render: () => (
    <DocumentInformation
      documentDetails={documentDetailsData}
      versionHistory={versionHistoryData}
    />
  ),
};
