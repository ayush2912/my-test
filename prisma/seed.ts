import { inspect } from 'util';

import { PrismaClient, Prisma } from '@prisma/client'

import { faker } from '@faker-js/faker';
import { create } from 'domain';

const prisma = new PrismaClient()

const organizationsData: Prisma.OrganizationCreateInput[] = Array.from({length: 20}).map(() =>({
  id: faker.database.mongodbObjectId(),
  name: faker.company.name(),
  url: faker.internet.url(),
  logo: faker.internet.avatar(),
  type: faker.helpers.arrayElement([ "INVESTOR", "PROJECT_AGGREGATOR", "THIRD_PARTY", "PROJECT_DEVELOPER" ]),
  estimatedPortfolio: faker.datatype.number({min: 100000, max: 1000000 }),
  expiryDate: faker.date.future(10),
  status: faker.helpers.arrayElement(["ACTIVE", "DISABLED"])
}))

const usersData: Prisma.UserCreateInput[] = Array.from({ length: 100 }).map(() => ({
  id: faker.database.mongodbObjectId(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  timezone: faker.address.timeZone(),
  email: faker.internet.email(),
  status: faker.helpers.arrayElement(["ACTIVE", "DISABLED"]),
  avatarUrl: faker.image.avatar(),
  organizationId: faker.helpers.arrayElement(organizationsData).id
}))

const gccProjectsData: Prisma.ProjectCreateInput[] = Array.from({ length: 24 }).map(() => ({
  id: faker.database.mongodbObjectId(),
  name: faker.company.name(), 
  estimatedAnnualEmissionReductions: faker.datatype.number({min: 10000, max: 100000 }),
  createdAt: faker.date.recent(60),
  registryId: "635ba952a04bfb3853bc2a41",
  projectStatus: faker.helpers.arrayElement(["Submitted", "Approved", "Approved Carbon Credit"]),
  organizationId: "634d1d32616a36bb9d27b32f"
}))

const verraProjectsData: Prisma.ProjectCreateInput[] = Array.from({ length: 37 }).map(() => ({
  id: faker.database.mongodbObjectId(),
  name: faker.company.name(),
  estimatedAnnualEmissionReductions: faker.datatype.number({min: 10000, max: 100000 }),
  createdAt: faker.date.recent(60),
  registryId: "635ba952a04bfb3853bc2a40",
  projectStatus: faker.helpers.arrayElement(["Under development", "Under validation", "Crediting Period Renewal", "Verification Approval Requested", "Crediting Period Renewal Requested", "Registration and verification approval requested", "Registration requested", "Registered", "Units Transferred from Approved GHG Program"]),
  organizationId: "634d1d32616a36bb9d27b32f"
}))

const gsProjectsData: Prisma.ProjectCreateInput[] = Array.from({ length: 29 }).map(() => ({
  id: faker.database.mongodbObjectId(),
  name: faker.company.name(),
  estimatedAnnualEmissionReductions: faker.datatype.number({min: 10000, max: 100000 }),
  createdAt: faker.date.recent(60),
  registryId: "635ba952a04bfb3853bc2a42",
  projectStatus: faker.helpers.arrayElement(["GOLD STANDARD PROJECT LISTED", "GOLD STANDARD DESIGN CERTIFIED", "CERTIFIED GOLD STANDARD PROJECT"]),
  organizationId: "634d1d32616a36bb9d27b32f"
}))


// console.log(inspect(projectsData, {depth: null, colors: true}))

const getOrganizations = async () => await prisma.organization.findMany()
const createProjects = async () => await prisma.project.createMany({
  data: [...gccProjectsData, ...verraProjectsData, ...gsProjectsData ]
})



createProjects()
    .then(results => console.log(results) )
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })

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
