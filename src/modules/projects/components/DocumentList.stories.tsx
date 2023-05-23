import type { Meta, StoryObj } from "@storybook/react";

import { DocumentList } from "./DocumentList";

const meta: Meta<typeof DocumentList> = {
  title: "Projects/Components/DocumentList",
  component: DocumentList,
};

export default meta;
type Story = StoryObj<typeof DocumentList>;

const documentListData = [
  {
    id: "6438f5f51725504ee3c94347",
    createdAt: "2019-08-24T14:15:22Z",
    name: "Detailed project report",
    source: "Consultant",
    fileFormat: "pdf",
    size: "1.3 MB",
  },
  {
    id: "6438f5f51725504e5c94347",
    createdAt: "2019-08-24T14:15:22Z",
    name: "Detailed project report",
    source: "Consultant",
    fileFormat: "pdf",
    size: "1.3 MB",
  },
];

const downloadFile = () => {
  console.log("something");
};

const goToDetailsPage = () => {
  console.log("somethign");
};

export const Default: Story = {
  render: () => (
    <DocumentList
      data={documentListData}
      onClickDownload={downloadFile}
      onGetInfo={goToDetailsPage}
    />
  ),
};
