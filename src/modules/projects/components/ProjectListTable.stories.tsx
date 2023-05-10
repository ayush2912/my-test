import type { Meta, StoryObj } from "@storybook/react";

import ProjectListTable, { ProjectRowItem, Headers } from "./ProjectListTable";

const meta: Meta<typeof ProjectListTable> = {
  title: "Projects/Components/ Project List Table",
  component: ProjectListTable,
};

export default meta;

type Story = StoryObj<typeof ProjectListTable>;

const projectLists: ProjectRowItem[] = [
  {
    projectName:
      "Songtao, Tongren, Wanshan and Yuping Rural Methane Songtao, Tongren, Wanshan and Yuping Rural Methane",
    registryName: "verra",
    registryId: "123",
    projectTypes: ["Renewables"],
    subTypes: ["Carbon capture"],
    countries: [
      {
        id: "IN",
        name: "India",
        iso2Name: "IN",
        iso3Name: "IND",
      },
      {
        id: "BY",
        name: "Belarus",
        iso2Name: "BY",
        iso3Name: "BRB",
      },
    ],
    portfolioOwner: "Renew Power",
    assetOwners: [
      {
        id: "6438f5f51725504e53c94356",
        name: "Renew Power",
      },
      {
        id: "6438f5f51725504e53c94356",
        name: "Renew Power",
      },
      {
        id: "6438f5f51725504e53c94356",
        name: "Renew Power",
      },
    ],
    annualApproximateCreditVolume: 300000,
    engagement: {
      state: "IN_PROGRESS",
      dueDate: "2023-06-05T16:00:00.000Z",
      type: "Feasibility study",
      isOverdue: false,
    },
  },
  {
    projectName:
      "Songtao, Tongren, Wanshan and Yuping Rural Methane Songtao, Tongren, Wanshan and Yuping Rural Methane",
    registryName: "verra",
    registryId: "123",
    projectTypes: ["Renewables"],
    subTypes: ["Carbon capture"],
    countries: [
      {
        id: "IN",
        name: "India",
        iso2Name: "IN",
        iso3Name: "IND",
      },
      {
        id: "BY",
        name: "Belarus",
        iso2Name: "BY",
        iso3Name: "BRB",
      },
    ],
    portfolioOwner: "Renew Power",
    assetOwners: [
      {
        id: "6438f5f51725504e53c94356",
        name: "Renew Power",
      },
      {
        id: "6438f5f51725504e53c94356",
        name: "Renew Power",
      },
      {
        id: "6438f5f51725504e53c94356",
        name: "Renew Power",
      },
    ],
    annualApproximateCreditVolume: 300000,
    engagement: {
      state: "IN_PROGRESS",
      dueDate: "2023-06-05T16:00:00.000Z",
      type: "Feasibility study",
      isOverdue: true,
    },
  },
  {
    projectName: "Songtao, Tongren, Wanshan and Yuping Rural Methane",
    registryName: "verra",
    registryId: "123",
    projectTypes: ["Renewables"],
    subTypes: ["Renewables"],
    countries: [
      {
        id: "IN",
        name: "India",
        iso2Name: "IN",
        iso3Name: "IND",
      },
    ],
    portfolioOwner: "Renew Power",
    assetOwners: [
      {
        id: "6438f5f51725504e53c94356",
        name: "Renew Power",
      },
    ],
    annualApproximateCreditVolume: 300000,
    engagement: {
      state: "COMPLETED",
      dueDate: "2023-06-05T16:00:00.000Z",
      type: "Issuance",
      isOverdue: false,
    },
  },
  {
    projectName:
      "Songtao, Tongren, Wanshan and Yuping Rural MethaneSongtao, Tongren, Wanshan and Yuping Rural Methane Songtao, Tongren, Wanshan and Yuping Rural Methane",
    registryName: "verra",
    registryId: "123",
    projectTypes: ["Renewables"],
    subTypes: ["Carbon capture"],
    countries: [
      {
        id: "IN",
        name: "India",
        iso2Name: "IN",
        iso3Name: "IND",
      },
      {
        id: "BY",
        name: "Belarus",
        iso2Name: "BY",
        iso3Name: "BRB",
      },
      {
        id: "BEL",
        name: "Belarus",
        iso2Name: "BE",
        iso3Name: "BEL",
      },
    ],
    portfolioOwner: "Renew Power",
    assetOwners: [
      {
        id: "6438f5f51725504e53c94356",
        name: "Renew Power",
      },
    ],
    annualApproximateCreditVolume: 300000,
    engagement: {
      state: "NOT_STARTED",
      dueDate: "2023-06-05T16:00:00.000Z",
      type: "Feasibility study",
      isOverdue: false,
    },
  },
];

const headers: Headers[] = [
  { name: "PROJECT NAME", fieldName: "projectName" },
  { name: "REGISTRY / ID", fieldName: "registyNameID" },
  { name: "PROJECT TYPE / SUB-TYPE", fieldName: "projectTypeSubtype" },
  { name: "COUNTRIES", fieldName: "coutries" },
  { name: "PORTFOLIO OWNER", fieldName: "portfolioOwners" },
  { name: "ASSET OWNER(S)", fieldName: "assetOwners" },
  {
    name: "ANNUAL APPROX.CR. VOL. (tCO2e)",
    fieldName: "annualApproximateCreditVolume",
  },
  { name: "LATEST ENGAGEMENT STATE & DUE DATE", fieldName: "engagement" },
];

export const Primary: Story = {
  render: () => <ProjectListTable headers={headers} tableData={projectLists} />,
};
