import type { Meta, StoryObj } from "@storybook/react";
import styled from "styled-components";

import DocumentListPanel from "./DocumentListPanel";
import DocumentOverwiewItem from "./DocumentOverview";

const meta: Meta<typeof DocumentListPanel> = {
  title: "Projects/Components/DocumentListPanel",
  component: DocumentListPanel,
};

export default meta;
type Story = StoryObj<typeof DocumentListPanel>;

const Divider = styled.div`
  height: 1px;
  background: #e1e4e8;
`;

const docs = [
  {
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
  },
  {
    //   fields not in use yet
    //   id: "6438f5f51725504e53c94347",
    //   updatedAt: "2019-08-24T14:15:22Z",
    //   type: "Carbon document",
    //   state: "ACTIVE",
    //   registryApprovalDate: "2019-08-24T14:15:22Z",
    createdAt: "2019-08-24T14:15:22Z",
    name: "Detailed project report",
    source: "Consultant",
    fileFormat: "ppt",
    size: "1.3 MB",
    id: "1234",
  },
  {
    //   fields not in use yet
    //   id: "6438f5f51725504e53c94347",
    //   updatedAt: "2019-08-24T14:15:22Z",
    //   type: "Carbon document",
    //   state: "ACTIVE",
    //   registryApprovalDate: "2019-08-24T14:15:22Z",
    createdAt: "2019-08-24T14:15:22Z",
    name: "Detailed project report",
    source: "Consultant",
    fileFormat: "jpg",
    size: "1.3 MB",
    id: "12345",
  },
  {
    //   fields not in use yet
    //   id: "6438f5f51725504e53c94347",
    //   updatedAt: "2019-08-24T14:15:22Z",
    //   type: "Carbon document",
    //   state: "ACTIVE",
    //   registryApprovalDate: "2019-08-24T14:15:22Z",
    createdAt: "2019-08-24T14:15:22Z",
    name: "Detailed project report",
    source: "Consultant",
    fileFormat: "jpg",
    size: "1.3 MB",
    id: "123456",
  },
  {
    //   fields not in use yet
    //   id: "6438f5f51725504e53c94347",
    //   updatedAt: "2019-08-24T14:15:22Z",
    //   type: "Carbon document",
    //   state: "ACTIVE",
    //   registryApprovalDate: "2019-08-24T14:15:22Z",
    createdAt: "2019-08-24T14:15:22Z",
    name: "Detailed project report",
    source: "Consultant",
    fileFormat: "jpg",
    size: "1.3 MB",
    id: "1234566",
  },
  {
    //   fields not in use yet
    //   id: "6438f5f51725504e53c94347",
    //   updatedAt: "2019-08-24T14:15:22Z",
    //   type: "Carbon document",
    //   state: "ACTIVE",
    //   registryApprovalDate: "2019-08-24T14:15:22Z",
    createdAt: "2019-08-24T14:15:22Z",
    name: "Detailed project report",
    source: "Consultant",
    fileFormat: "jpg",
    size: "1.3 MB",
    id: "1234588",
  },
  {
    //   fields not in use yet
    //   id: "6438f5f51725504e53c94347",
    //   updatedAt: "2019-08-24T14:15:22Z",
    //   type: "Carbon document",
    //   state: "ACTIVE",
    //   registryApprovalDate: "2019-08-24T14:15:22Z",
    createdAt: "2019-08-24T14:15:22Z",
    name: "Detailed project report",
    source: "Consultant",
    fileFormat: "jpg",
    size: "1.3 MB",
    id: "12345667",
  },
  {
    //   fields not in use yet
    //   id: "6438f5f51725504e53c94347",
    //   updatedAt: "2019-08-24T14:15:22Z",
    //   type: "Carbon document",
    //   state: "ACTIVE",
    //   registryApprovalDate: "2019-08-24T14:15:22Z",
    createdAt: "2019-08-24T14:15:22Z",
    name: "Detailed project report",
    source: "Consultant",
    fileFormat: "jpg",
    size: "1.3 MB",
    id: "1234545",
  },
  {
    //   fields not in use yet
    //   id: "6438f5f51725504e53c94347",
    //   updatedAt: "2019-08-24T14:15:22Z",
    //   type: "Carbon document",
    //   state: "ACTIVE",
    //   registryApprovalDate: "2019-08-24T14:15:22Z",
    createdAt: "2019-08-24T14:15:22Z",
    name: "Detailed project report",
    source: "Consultant",
    fileFormat: "jpg",
    size: "1.3 MB",
    id: "1234545432",
  },
];

export const Primary: Story = {
  render: () => (
    <DocumentListPanel
      loading={false}
      docQuantity={20}
      onClose={() => console.log("close")}
      title="Feasibility study"
    >
      {docs.map((doc) => {
        return (
          <>
            {/* <Divider /> */}
            <DocumentOverwiewItem
              onClickDownload={() => console.log("download file")}
              onGetInfo={() => console.log("check info")}
              documentInfo={doc}
            />
          </>
        );
      })}
    </DocumentListPanel>
  ),
};

export const Secondary: Story = {
  render: () => (
    <DocumentListPanel
      loading={true}
      docQuantity={20}
      onClose={() => console.log("close")}
      title="Feasibility study"
    >
      {docs.map((doc) => {
        return (
          <>
            {/* <Divider /> */}
            <DocumentOverwiewItem
              onClickDownload={() => console.log("download file")}
              onGetInfo={() => console.log("check info")}
              documentInfo={doc}
            />
          </>
        );
      })}
    </DocumentListPanel>
  ),
};
