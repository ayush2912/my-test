import type { Meta, StoryObj } from "@storybook/react";

import DocumentOverwiewItem, { DocumentInfo } from "./DocumentOverview";

const meta: Meta<typeof DocumentOverwiewItem> = {
  title: "Projects/Components/DocumentOverwiewItem",
  component: DocumentOverwiewItem,
};

export default meta;
type Story = StoryObj<typeof DocumentOverwiewItem>;

const DocItem: DocumentInfo = {
  //   fields not in use yet
  //   id: "6438f5f51725504e53c94347",
  //   updatedAt: "2019-08-24T14:15:22Z",
  //   type: "Carbon document",
  //   state: "ACTIVE",
  //   registryApprovalDate: "2019-08-24T14:15:22Z",
  createdAt: "2019-08-24T14:15:22Z",
  name: "Detailed project report",
  source: "Consultant",
  fileFormat: "pdf",
  size: "1.3 MB",
};

export const Primary: Story = {
  render: () => (
    <DocumentOverwiewItem
      onClickDownload={() => console.log("download file")}
      onGetInfo={() => console.log("check info")}
      documentInfo={DocItem}
    />
  ),
};
