import type { Meta, StoryObj } from "@storybook/react";

import DocumentPreview from "./DocumentPreview";

const meta: Meta<typeof DocumentPreview> = {
  component: DocumentPreview,
};

export default meta;
type Story = StoryObj<typeof DocumentPreview>;

const documentDetails = {
  documentName: "TEST DOC 1",
  fileFormat: "pdf",
  size: "1.3 MB",
  source: "Client",
  date: new Date(),
};

export const Default: Story = {
  render: () => <DocumentPreview documentDetails={documentDetails} />,
};
