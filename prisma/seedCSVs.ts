import { PrismaClient } from "@prisma/client";
import { promises as fs } from "fs";
import { parse } from "csv-parse/sync";
import { ObjectId } from "bson";

import { isEmpty, omitBy, omit, find, get } from "lodash/fp";

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
    "readOrganization",
    "listUsers",
    "listProjects",
    "readProject",
    "readDocument",
    "readChat",
  ],
  CLIENT_ADMIN: [
    "readOrganization",
    "createUser",
    "updateUser",
    "deleteUser",
    "listProjects",
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
    "readOrganization",
    "listUsers",
    "listProjects",
    "readProject",
    "readDocument",
    "readChat",
  ],
};

const compactObject = omitBy(isEmpty);

type Organization = {
  id?: string;
  name: string;
  url?: string;
  type?: string;
  estimatedPortfolio?: string;
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
  );
  const usersCsv: User[] = parse(await fs.readFile("./csv/users.csv"), {
    columns: true,
  });

  const organizations = organizationsCsv.map(addObjectId).map(compactObject);

  const users = usersCsv
    .map(addObjectId)
    .map((user: User) => ({
      organizationId: findOrganization(user)([
        ...organizations,
        {
          id: "637f888f6184c03469ac39fe", // Climate Connect Digital's ID in Staging environment
          name: "Climate Connect Digital",
        },
      ])?.id,
      permissions: get(user.role)(permissionsList),
      ...user,
    }))
    .map(compactObject);

  const accessPolicies = users.map((user: any) => ({
    userId: user.id,
    organizationId: user.organizationId,
    role: user.role,
    isPrimary: true,
    permissions: user.permissions,
  }));

  const usersData: any = users
    .map(omit("permissions"))
    .map(omit("role"))
    .map(omit("organization"));

  console.log(organizations, usersData, accessPolicies);

  return;

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
