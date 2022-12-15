import { PrismaClient, Prisma } from "@prisma/client";

import { ObjectId } from "bson";

const prisma = new PrismaClient();

const handlerOrganizationsData = {
  id: new ObjectId().toString(),
  name: "Climate Connect Digital",
  url: "https://climateconnect.digital",
  type: "PROJECT_AGGREGATOR",
  status: "ACTIVE",
};

const handlerAdminUserData = [
  {
    email: "steven.neoh@climateconnect.digital", 
    firstName: "Steven", 
    lastName: "Neoh",
  }, 
  {
    email: "shyamal.majumdar@climateconnect.digital",
    firstName: "Shyamal",
    lastName: "Majumdar",
  },
  {
    email: "ajay.shelar@climateconnect.digital",
    firstName: "Ajay",
    lastName: "Shelar",
  },
  {
    email: "sharad.mishra@climateconnect.digital",
    firstName: "Sharad",
    lastName: "Mishra",
  },
  {
    email: "koushik@climateconnect.digital",
    firstName: "Koushik",
    lastName: "Sen",
  },
  {
    email: "swapnil.patil@climateconnect.digital",
    firstName: "Swapnil",
    lastName: "Patil",
  },
  {
    email: "grey.ang@climateconnect.digital",
    firstName: "Grey",
    lastName: "Ang",
  },
  {
    email: "rachana.chikka@climateconnect.digital",
    firstName: "Rachana",
    lastName: "Chikka",
  },
].map((user) => ({
  id: new ObjectId().toString(),
  organizationId: handlerOrganizationsData.id,
  status: "ACTIVE",
  ...user,
}));

const handlerAdminAccessPolicies = handlerAdminUserData.map((user) => ({
  userId: user.id,
  organizationId: handlerOrganizationsData.id,
  isPrimary: true,
  role: "HANDLER_ADMIN",
  permissions: [
      "listAllOrganizations",
      "createAnyOrganization",
      "readAnyOrganization",
      "updateAnyOrganization",
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
      "deleteAnyProject",
      "readAnyDocument",
      "readAnyChat",
      "createDocumentAsHandler",
      "updateDocumentAsHandler",
      "deleteDocument",
      "readChat",
      "createChatAsHandler"
  ],
}));

async function main() {
  return Promise.all([
    prisma.organization.createMany({ data: [handlerOrganizationsData] }),
    prisma.user.createMany({ data: handlerAdminUserData }),
    prisma.accessPolicy.createMany({ data: handlerAdminAccessPolicies })
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
