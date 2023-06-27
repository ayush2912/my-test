import type { Meta, StoryObj } from "@storybook/react";

import { DocumentList, IDocumentList } from "./DocumentList";

const meta: Meta<typeof DocumentList> = {
  component: DocumentList,
};

export default meta;
type Story = StoryObj<typeof DocumentList>;

const documentListData: IDocumentList = [
  {
    id: "6438f5f51725504ee3c94347",
    date: "2019-08-24T14:15:22Z",
    name: "Detailed project report",
    source: "Consultant",
    fileFormat: "doc",
    size: "1.3 MB",
  },
  {
    id: "6438f5f51725504e5c94347",
    date: "2019-08-24T14:15:22Z",
    name: "Purchase Order",
    source: "Consultant",
    fileFormat: "docx",
    size: "1.3 MB",
  },
  {
    id: "6438f5f517254errwe504e5c94347",
    date: "2019-08-24T14:15:22Z",
    name: "Operation & Maintenance Contract",
    source: "Consultant",
    fileFormat: "jpg",
    size: "1.3 MB",
  },
  {
    id: "6438f5f5sdfd172sdfdf5504e5c94347",
    date: "2019-08-24T14:15:22Z",
    name: "Power Purchase Agreement",
    source: "Consultant",
    fileFormat: "ppt",
    size: "1.3 MB",
  },
  {
    id: "6438f5f5sdfd172sdfdsfsdfdf5504e5c94347",
    date: "2019-08-24T14:15:22Z",
    name: "Third Party Inspection Report",
    source: "Consultant",
    fileFormat: "pptx",
    size: "1.3 MB",
  },
  {
    id: "6438f5f5sdfd172sdfdfsdfsdfg5504e5c94347",
    date: "2019-08-24T14:15:22Z",
    name: "Offer Letter",
    source: "Other",
    fileFormat: "xls",
    size: "1.3 MB",
  },
  {
    id: "6438f5f5sdfd172sdfdf5504e5c94347",
    date: "2019-08-24T14:15:22Z",
    name: "Detailed project report",
    source: "Consultant",
    fileFormat: "xlsx",
    size: "1.3 MB",
  },
  {
    id: "6438f5f5sdfdsdfdsfdsf172sdfdf5504e5c94347",
    date: "2019-08-24T14:15:22Z",
    name: "Geographical Location & Address",
    source: "Client",
    fileFormat: "pdf",
    size: "1.3 MB",
  },
  {
    id: "6438f5f5sdfdsdfdsfdsf172sdfdf5504e5c94347",
    date: "2019-08-24T14:15:22Z",
    name: "Geographical Location & Address",
    source: "Client",
    fileFormat: "png",
    size: "1.3 MB",
  },
];

const downloadFile = (id: string, name: string, extension: string) => {
  console.log("something", id, name, extension);
};

const goToDetailsPage = (id: string) => {
  console.log("something", id);
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