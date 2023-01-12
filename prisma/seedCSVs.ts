import { PrismaClient } from "@prisma/client";
import { promises as fs } from "fs";
import { parse } from "csv-parse/sync";
import { ObjectId } from "bson";

import { isEmpty, omitBy, omit, find, get, mapValues, trim } from "lodash/fp";
import { flatten } from "lodash";

const prisma = new PrismaClient();

const permissionsList = {
  HANDLER_ADMIN: [
    "listAllOrganizations",
    "createAnyOrganization",
    "readAnyOrganization",
    "updateAnyOrganization ",
    "deleteAnyOrganization",
    "listAllUsers",
    "readAnyUser",
    "createAnyUser",
    "updateAnyUser",
    "deleteAnyUser",
    "listAllProjects",
    "readAnyProject",
    "createAnyProject",
    "updateAnyProject",
    "deleteAnyProject ",
    "readAnyDocument",
    "readAnyChat",
    "createDocumentAsHandler ",
    "updateDocumentAsHandler",
    "deleteDocument",
    "readChat",
    "createChatAsHandler",
  ],
  HANDLER_MEMBER: [
    "listOrganizations",
    "readOrganization",
    "listUsers",
    "readUser",
    "listProjects",
    "readProject",
    "readDocument",
    "readChat",
  ],
  CLIENT_ADMIN: [
    "listOrganizations",
    "readOrganization",
    "listUsers",
    "readUser",
    "createUser",
    "updateUser",
    "deleteUser",
    "listProjects",
    "readProject",
    "createProject",
    "updateProject",
    "deleteProject",
    "readDocument",
    "createDocumentAsClient",
    "updateDocumentAsClient",
    "deleteDocument",
    "readChat",
    "createChatAsClient",
  ],
  CLIENT_MEMBER: [
    "listOrganizations",
    "readOrganization",
    "listUsers",
    "readUser",
    "listProjects",
    "readProject",
    "readDocument",
    "readChat",
  ],
};

const extraPermissionsList = {
  ADD_OR_EDIT_USERS: ["createUser", "updateUser"],
  ADD_PROJECTS_AS_HANDLER: ["createProject"],
  EDIT_PROJECTS_AS_HANDLER: [
    "updateProject",
    "createDocumentAsHandler",
    "updateDocumentAsHandler",
    "createChatAsHandler",
    "deleteDocument",
  ],
  EDIT_DOCS_AND_CHAT_AS_CLIENT: [
    "createDocumentAsClient",
    "updateDocumentAsClient",
    "createChatAsClient",
    "deleteDocument",
  ],
};

const compactObject = omitBy(isEmpty);

type Organization = {
  id?: string;
  name: string;
  url?: string;
  type?: string;
  estimatedPortfolio?: string | number;
  expiryDate?: string;
};

type User = {
  id?: string;
  firstName: string;
  lastName: string;
  role: string;
  organization?: string;
  organizationId?: string;
  email?: string;
  permissions?: string[];
  canAddEditUsers?: string;
  canAddProject?: string;
  canEditProjectAsHandler?: string;
  canEditProjectAsClient?: string;
};

const addObjectId = (obj: any) => ({
  id: new ObjectId().toString(),
  ...obj,
});

const findOrganization = (user: User) =>
  find((org: Organization) => user.organization === org.name);

async function main() {
  const organizationsCsv: Organization[] = parse(
    await fs.readFile("./csv/organizations.csv"),
    {
      columns: true,
    }
  )
  const usersCsv: User[] = parse(await fs.readFile("./csv/users.csv"), {
    columns: true,
  });

  const organizations = organizationsCsv.map((o: any) => ({ ...o, estimatedPortfolio: parseInt(o.estimatedPortfolio) })).map(addObjectId).map(compactObject);

  const users = usersCsv
    .map(addObjectId)
    .map((user: User) => ({
      ...user,
      organizationId: findOrganization(user)([
        ...organizations,
        // {
        //   id: "63b51f49115bfb257b75f110", // Climate Connect Digital's ID in Staging environment
        //   name: "Climate Connect Digital",
        // },
        // {
        //   id: "63b57738115bfb257b75f130",
        //   name: "Demo 1",
        // },
      ])?.id,
      permissions: flatten([
        get(user.role)(permissionsList),
        user.canAddEditUsers
          ? get("ADD_OR_EDIT_USERS")(extraPermissionsList)
          : [],
        user.canAddProject
          ? get("ADD_PROJECTS_AS_HANDLER")(extraPermissionsList)
          : [],
        user.canEditProjectAsHandler
          ? get("EDIT_PROJECTS_AS_HANDLER")(extraPermissionsList)
          : [],
        user.canEditProjectAsClient
          ? get("EDIT_DOCS_AND_CHAT_AS_CLIENT")(extraPermissionsList)
          : [],
      ]),
      firstName: trim(user.firstName),
      lastName: trim(user.lastName),
    }))
    .map(compactObject);

  const accessPolicies = users.map((user: any) => ({
    userId: user.id,
    organizationId: user.organizationId,
    role: user.role,
    isPrimary: true,
    permissions: user.permissions,
  }));

  const usersData: any = users.map(
    omit([
      "permissions",
      "role",
      "organization",
      "canAddEditUsers",
      "canAddProject",
      "canEditProjectAsHandler",
      "canEditProjectAsClient",
    ])
  );

  console.log(organizations, usersData, accessPolicies);

  return Promise.all([
    prisma.organization.createMany({ data: organizations }),
    prisma.user.createMany({ data: usersData }),
    prisma.accessPolicy.createMany({ data: accessPolicies }),
  ]).then((results) => console.log(results));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
