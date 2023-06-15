import type { Meta, StoryObj } from "@storybook/react";

import DocumentPreview from "./DocumentPreview";

const meta: Meta<typeof DocumentPreview> = {
  component: DocumentPreview,
};

export default meta;
type Story = StoryObj<typeof DocumentPreview>;

export const Default: Story = {
  render: () => <DocumentPreview />,
};
