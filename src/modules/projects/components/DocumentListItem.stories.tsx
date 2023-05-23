import type { Meta, StoryObj } from "@storybook/react";

import DocumentListItem, { DocumentInfo } from "./DocumentListItem";

const meta: Meta<typeof DocumentListItem> = {
  title: "Projects/Components/DocumentListItem",
  component: DocumentListItem,
};

export default meta;
type Story = StoryObj<typeof DocumentListItem>;

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
  id: "123",
};

const VersionDocItem: DocumentInfo = {
  //   fields not in use yet
  //   id: "6438f5f51725504e53c94347",
  //   updatedAt: "2019-08-24T14:15:22Z",
  //   type: "Carbon document",
  //   state: "ACTIVE",
  //   registryApprovalDate: "2019-08-24T14:15:22Z",
  createdAt: "2019-08-24T14:15:22Z",
  name: "Detailed project report",
  fileFormat: "pdf",
  size: "1.3 MB",
  id: "123",
};

export const Default: Story = {
  render: () => (
    <DocumentListItem
      onClickDownload={() => console.log("download file")}
      onGetInfo={() => console.log("check info")}
      documentInfo={DocItem}
    />
  ),
};

export const MultipleDocs: Story = {
  render: () => (
    <>
      <DocumentListItem
        onClickDownload={() => console.log("download file")}
        onGetInfo={() => console.log("check info")}
        documentInfo={DocItem}
      />

      <DocumentListItem
        onClickDownload={() => console.log("download file")}
        onGetInfo={() => console.log("check info")}
        documentInfo={DocItem}
      />
    </>
  ),
};

export const withoutInfoButtonAndSource: Story = {
  render: () => (
    <DocumentListItem
      onClickDownload={() => console.log("download file")}
      documentInfo={VersionDocItem}
    />
  ),
};
