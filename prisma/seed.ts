import { PrismaClient, Prisma } from "@prisma/client";

import { faker } from "@faker-js/faker";

import { flattenDeep, compact } from "lodash/fp";
import { result } from "lodash";

const prisma = new PrismaClient();

// const organizationsData: Prisma.OrganizationCreateInput[] = Array.from({
//   length: 20,
// }).map(() => ({
//   id: faker.database.mongodbObjectId(),
//   name: faker.company.name(),
//   url: faker.internet.url(),
//   // logo: faker.internet.avatar(),
//   type: faker.helpers.arrayElement([
//     "INVESTOR",
//     "PROJECT_AGGREGATOR",
//     "THIRD_PARTY",
//     "PROJECT_DEVELOPER",
//   ]),
//   estimatedPortfolio: faker.datatype.number({ min: 100000, max: 1000000 }),
//   expiryDate: faker.date.future(10),
//   status: "ACTIVE",
// }));

const getHandlerMemberPermissions = (): string[] =>
  flattenDeep(
    faker.helpers.arrayElements([
      [],
      ["createUser", "updateUser"],
      ["createProject"],
      [
        "updateProject",
        "createDocumentAsHandler",
        "updateDocumentAsHandler",
        "createChatAsHandler",
      ],
    ])
  );

const getClientMemberAccessPolicy = (): string[] =>
  faker.helpers.arrayElement([
    [],
    ["createDocumentAsClient", "updateDocumentAsClient", "createChatAsClient"],
  ]);

const getHandlerAccessPolicy = () =>
  faker.helpers.arrayElement([
    {
      role: "HANDLER_ADMIN",
      permissions: [
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
    },
    {
      role: "HANDLER_MEMBER",
      permissions: Array.prototype.concat(
        [
          "readOrganization",
          "listUsers",
          "listProjects",
          "readProject",
          "readDocument",
          "readChat",
        ],
        ...getHandlerMemberPermissions()
      ),
    },
  ]);

const getClientAccessPolicy = () =>
  faker.helpers.arrayElement([
    {
      role: "CLIENT_ADMIN",
      permissions: [
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
    },
    {
      role: "CLIENT_MEMBER",
      permissions: Array.prototype.concat(
        [
          "readOrganization",
          "listUsers",
          "listProjects",
          "readProject",
          "readDocument",
          "readChat",
        ],
        getClientMemberAccessPolicy()
      ),
    },
  ]);

// const usersData = Array.from({ length: 100 }).map(() => ({
//   id: faker.database.mongodbObjectId(),
//   firstName: faker.name.firstName(),
//   lastName: faker.name.lastName(),
//   timezone: faker.address.timeZone(),
//   email: faker.internet.email(),
//   status: "ACTIVE",
//   organizationId: faker.helpers.arrayElement(organizationsData).id,
// }));

// const handlerMemberPrimaryOrgAccessPoliciesData = usersData.map((user) => ({
//   userId: user.id,
//   organizationId: user.organizationId,
//   role: "HANDLER_MEMBER",
//   permissions: Array.prototype.concat(
//     [
//       "readOrganization",
//       "listUsers",
//       "listProjects",
//       "readProject",
//       "readDocument",
//       "readChat",
//     ],
//     ...getHandlerMemberPermissions()
//   ),
// }));

// const handlerMemberSecondaryOrgAccessPoliciesData = compact(
//   flattenDeep(
//     faker.helpers.arrayElements(organizationsData).map((organization) =>
//       faker.helpers.arrayElements(usersData).map((user) =>
//         user.organizationId != organization.id
//           ? {
//               userId: user.id,
//               organizationId: organization.id,
//               role: "HANDLER_MEMBER",
//               permissions: Array.prototype.concat(
//                 [
//                   "readOrganization",
//                   "listUsers",
//                   "listProjects",
//                   "readProject",
//                   "readDocument",
//                   "readChat",
//                 ],
//                 ...getHandlerMemberPermissions()
//               ),
//             }
//           : undefined
//       )
//     )
//   )
// );

// const clientUsersData = flattenDeep(
//   faker.helpers.arrayElements(organizationsData).map((organization) =>
//     Array.from({ length: 30 }).map(() => ({
//       id: faker.database.mongodbObjectId(),
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       timezone: faker.address.timeZone(),
//       email: faker.internet.email(),
//       status: "ACTIVE",
//       organizationId: organization.id,
//     }))
//   )
// );

// const clientAccessPolicyData = clientUsersData.map((user) => ({
//   userId: user.id,
//   organizationId: user.organizationId,
//   ...getClientAccessPolicy(),
// }));

// const getAccessPolicies = async () =>
//   await prisma.accessPolicy.findMany({
//     where: {
//       role: { equals: "HANDLER_MEMBER" },
//     },
//     select: {
//       userId: true,
//     },
//   }).then((results) => results.map((r) => ({

//   })));

// console.log(usersData, handlerMemberPrimaryOrgAccessPolicies, handlerMemberSecondaryOrgAccessPolicies);

const sectoralScopes = [
  "RE_NRE",
  "ENERGY_DISTRIBUTION",
  "ENERGY_DEMAND",
  "MANUFACTURING",
  "CHEMICAL",
  "CONSTRUCTION",
  "TRANSPORT",
  "MINING_MINERAL_PRODUCTION",
  "METAL_PRODUCTION",
  "FUGITIVE_EM_FUELS",
  "FUGITIVE_EM_GASSES",
  "SOLVENTS_USE",
  "WASTE_HANDLING_DISPOSAL",
  "AFFORESTATION_REFORESTATION`",
  "LIVESTOCK_MANURE_MGT",
  "CARBON_CAPTURE_STORAGE",
];

const stages = [
  "PENDING",
  "REJECTED",
  "REGISTERED",
  "DEVELOPMENT",
  "VALIDATION",
  "REGISTRATION",
  "REGISTERED",
  "MONITORING",
  "VERIFICATION",
  "ISSUANCE",
  "ISSUED",
  "CP_END",
  "RE_REG",
  "DE_REG",
  "CP_REN",
];

const countries = [
  "AF",
  "AX",
  "AL",
  "DZ",
  "AS",
  "AD",
  "AO",
  "AI",
  "AQ",
  "AG",
  "AR",
  "AM",
  "AW",
  "AU",
  "AT",
  "AZ",
  "BS",
  "BH",
  "BD",
  "BB",
  "BY",
  "BE",
  "BZ",
  "BJ",
  "BM",
  "BT",
  "BO",
  "BA",
  "BW",
  "BV",
  "BR",
  "IO",
  "BN",
  "BG",
  "BF",
  "BI",
  "KH",
  "CM",
  "CA",
  "CV",
  "KY",
  "CF",
  "TD",
  "CL",
  "CN",
  "CX",
  "CC",
  "CO",
  "KM",
  "CG",
  "CD",
  "CK",
  "CR",
  "CI",
  "HR",
  "CU",
  "CY",
  "CZ",
  "DK",
  "DJ",
  "DM",
  "DO",
  "EC",
  "EG",
  "SV",
  "GQ",
  "ER",
  "EE",
  "ET",
  "FK",
  "FO",
  "FJ",
  "FI",
  "FR",
  "GF",
  "PF",
  "TF",
  "GA",
  "GM",
  "GE",
  "DE",
  "GH",
  "GI",
  "GR",
  "GL",
  "GD",
  "GP",
  "GU",
  "GT",
  "GG",
  "GN",
  "GW",
  "GY",
  "HT",
  "HM",
  "VA",
  "HN",
  "HK",
  "HU",
  "IS",
  "IN",
  "ID",
  "IR",
  "IQ",
  "IE",
  "IM",
  "IL",
  "IT",
  "JM",
  "JP",
  "JE",
  "JO",
  "KZ",
  "KE",
  "KI",
  "KR",
  "KP",
  "KW",
  "KG",
  "LA",
  "LV",
  "LB",
  "LS",
  "LR",
  "LY",
  "LI",
  "LT",
  "LU",
  "MO",
  "MK",
  "MG",
  "MW",
  "MY",
  "MV",
  "ML",
  "MT",
  "MH",
  "MQ",
  "MR",
  "MU",
  "YT",
  "MX",
  "FM",
  "MD",
  "MC",
  "MN",
  "ME",
  "MS",
  "MA",
  "MZ",
  "MM",
  "NA",
  "NR",
  "NP",
  "NL",
  "AN",
  "NC",
  "NZ",
  "NI",
  "NE",
  "NG",
  "NU",
  "NF",
  "MP",
  "NO",
  "OM",
  "PK",
  "PW",
  "PS",
  "PA",
  "PG",
  "PY",
  "PE",
  "PH",
  "PN",
  "PL",
  "PT",
  "PR",
  "QA",
  "RE",
  "RO",
  "RU",
  "RW",
  "BL",
  "SH",
  "KN",
  "LC",
  "MF",
  "PM",
  "VC",
  "WS",
  "SM",
  "ST",
  "SA",
  "SN",
  "RS",
  "SC",
  "SL",
  "SG",
  "SK",
  "SI",
  "SB",
  "SO",
  "ZA",
  "GS",
  "ES",
  "LK",
  "SD",
  "SR",
  "SJ",
  "SZ",
  "SE",
  "CH",
  "SY",
  "TW",
  "TJ",
  "TZ",
  "TH",
  "TL",
  "TG",
  "TK",
  "TO",
  "TT",
  "TN",
  "TR",
  "TM",
  "TC",
  "TV",
  "UG",
  "UA",
  "AE",
  "GB",
  "US",
  "UM",
  "UY",
  "UZ",
  "VU",
  "VE",
  "VN",
  "VG",
  "VI",
  "WF",
  "EH",
  "YE",
  "ZM",
  "ZW",
];

const getProjectsData = () =>
  prisma.organization
    .findMany({
      select: {
        id: true,
      },
    })
    .then((results) => results)
    .then((organizations) =>
      organizations.map((org) =>
        Array.from({
          length: faker.datatype.number({ min: 1, max: 20 }),
        }).map(() => ({
          id: faker.database.mongodbObjectId(),
          name: faker.company.name(),
          estimatedAnnualEmissionReductions: faker.datatype.number({
            min: 10000,
            max: 100000,
          }),
          createdAt: faker.date.recent(60),
          // registryId: "635ba952a04bfb3853bc2a41",
          stage: faker.helpers.arrayElement(stages),
          sectoralScope: faker.helpers.arrayElement(sectoralScopes),
          country: faker.helpers.arrayElement(countries),
          organizationId: org.id,
        }))
      )
    );

// const gccProjectsData = Array.from({
//   length: faker.datatype.number({min:1, max:20}),
// }).map(() => ({
//   id: faker.database.mongodbObjectId(),
//   name: faker.company.name(),
//   estimatedAnnualEmissionReductions: faker.datatype.number({
//     min: 10000,
//     max: 100000,
//   }),
//   createdAt: faker.date.recent(60),
//   // registryId: "635ba952a04bfb3853bc2a41",
//   stage: faker.helpers.arrayElement(stages),
//   sectoralScope: faker.helpers.arrayElement(sectoralScopes),
//   country: faker.helpers.arrayElement(countries),
//   // projectStatus: faker.helpers.arrayElement([
//   //   "Submitted",
//   //   "Approved",
//   //   "Approved Carbon Credit",
//   // ]),
//   organizationId: "634d1d62616a36bb9d27b330",
// }));

async function main() {
  const projects = flattenDeep(await getProjectsData());
  const projectStages = projects.map((project) => ({
    projectId: project.id,
    type: project.stage,
    startDate: project.createdAt,
    dueDate: faker.date.soon(90),
  }));

  return Promise.all([
    prisma.project.createMany({ data: projects }),
    prisma.projectStage.createMany({ data: projectStages }),
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

// const verraProjectsData: Prisma.ProjectCreateInput[] = Array.from({
//   length: 37,
// }).map(() => ({
//   id: faker.database.mongodbObjectId(),
//   name: faker.company.name(),
//   estimatedAnnualEmissionReductions: faker.datatype.number({
//     min: 10000,
//     max: 100000,
//   }),
//   createdAt: faker.date.recent(60),
//   registryId: "635ba952a04bfb3853bc2a40",
//   stage: faker.helpers.arrayElement(stages),
//   sectoralScope: faker.helpers.arrayElement(sectoralScopes),
//   projectStatus: faker.helpers.arrayElement([
//     "Under development",
//     "Under validation",
//     "Crediting Period Renewal",
//     "Verification Approval Requested",
//     "Crediting Period Renewal Requested",
//     "Registration and verification approval requested",
//     "Registration requested",
//     "Registered",
//     "Units Transferred from Approved GHG Program",
//   ]),
//   organizationId: "634d1d62616a36bb9d27b330",
// }));

// const gsProjectsData: Prisma.ProjectCreateInput[] = Array.from({
//   length: 29,
// }).map(() => ({
//   id: faker.database.mongodbObjectId(),
//   name: faker.company.name(),
//   estimatedAnnualEmissionReductions: faker.datatype.number({
//     min: 10000,
//     max: 100000,
//   }),
//   createdAt: faker.date.recent(60),
//   registryId: "635ba952a04bfb3853bc2a42",
//   stage: faker.helpers.arrayElement(stages),
//   sectoralScope: faker.helpers.arrayElement(sectoralScopes),
//   projectStatus: faker.helpers.arrayElement([
//     "GOLD STANDARD PROJECT LISTED",
//     "GOLD STANDARD DESIGN CERTIFIED",
//     "CERTIFIED GOLD STANDARD PROJECT",
//   ]),
//   organizationId: "634d1d62616a36bb9d27b330",
// }));

// console.log(inspect(projectsData, {depth: null, colors: true}))

// const getOrganizations = async () => await prisma.organization.findMany();
// const createProjects = async () =>
//   await prisma.project.createMany({
//     data: [...gccProjectsData, ...verraProjectsData, ...gsProjectsData],
//   });

// Promise.all([
//   prisma.project.createMany({ data: gccProjectsData }),
//   prisma.projectStage.createMany({ data: projectStagesData }),
// ])
//   .then((results) => console.log(results))
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

// Promise.all([
//   prisma.organization.createMany({ data: organizationsData }),
//   prisma.user.createMany({ data: flattenDeep([usersData, clientUsersData]) }),
//   prisma.accessPolicy.createMany({
//     data: [
//       ...handlerMemberPrimaryOrgAccessPoliciesData,
//       ...handlerMemberSecondaryOrgAccessPoliciesData,
//       ...clientAccessPolicyData,
//     ],
//   }),
// ])
//   .then((results) => console.log(results))
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

// createProjects()
//   .then((results) => console.log(results))
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

// getOrganizations()
//     .then(results => console.log(results) )
//     .then(async () => {
//       await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//       console.error(e)
//       await prisma.$disconnect()
//       process.exit(1)
//     })

// async function main() {
//   console.log(`Start seeding ...
//   for (const u of userData) {
//     const user = await prisma.user.create({
//       data: u,
//     })
//     console.log(`Created user with id: ${user.id}`)
//   }
//   console.log(`Seeding finished.`)
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
