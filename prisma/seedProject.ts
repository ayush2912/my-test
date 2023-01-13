import { PrismaClient } from "@prisma/client";
import { promises as fs } from "fs";
import { parse } from "csv-parse/sync";
import { ObjectId } from "bson";
import moment from "moment"
import {getCode} from "country-list"

import { inspect } from "util"; 

import { isEmpty, omitBy, omit, find, get, mapValues, trim, compact, flatten } from "lodash/fp";

const prisma = new PrismaClient();

const compactObject = omitBy(isEmpty);

async function main() {
    const projectsCsv = parse(await fs.readFile("./csv/projects.csv"), {
        columns: true
    })

    const sectoralScopesMapping:any = {
        "RE/Non-RE": "RE_NRE",
        "Energy distribution": "ENERGY_DISTRIBUTION",
        "Energy demand": "ENERGY_DEMAND",
        "Manufacturing industries": "MANUFACTURING",
        "Chemical industry": "CHEMICAL",
        "Construction": "CONSTRUCTION",
        "Transport": "TRANSPORT",
        "Mining/Mineral production": "MINING_MINERAL_PRODUCTION",
        "Metal production": "METAL_PRODUCTION",
        "Fugitive Em. Fuels": "FUGITIVE_EM_FUELS",
        "Fugitive Em. Gases": "FUGITIVE_EM_GASSES",
        "Solvents use": "SOLVENTS_USE",
        "Waste handling/disposal": "WASTE_HANDLING_DISPOSAL" ,
        "Afforestation/Reforestation": "AFFORESTATION_REFORESTATION",
        "Livestock/Manure mgt": "LIVESTOCK_MANURE_MGT",
        "Carbon capture/storage": "CARBON_CAPTURE_STORAGE"
    }

    const projects = projectsCsv.map(async (p: any) => ({
        id: new ObjectId().toString(), 
        organizationId: (await prisma.organization.findFirst({where: {
            name: {
                equals: p["Account"]
            }
        }}) || {}).id,
        registryId: (await prisma.registry.findFirst({where: {
            name: {
                equals: p["Registry"]
            }
        }}) || {}).id, 
        registryProjectId: p["Project ID"], 
        registryProjectUrl: p["Project URL"],
        name: p["Project Name"],
        sectoralScope: sectoralScopesMapping[p["Sectoral Scope"]],
        country: getCode(p["Country"]), 
        stage: p["Stage2"] ? sectoralScopesMapping[p["Stage2"]] : sectoralScopesMapping[p["Stage1"]],
        stages: compact([
            p["Stage1"] ? {
                type: p["Stage1"].toUpperCase(),
                startDate: moment(p["Stage1 Start Date"], "DD/MM/YY").format(),
                endDate: moment(p["Stage1 End Date"], "DD/MM/YY").format()
            } : undefined, 
            p["Stage2"] ? {
                type: p["Stage2"].toUpperCase(),
                startDate: moment(p["Stage2 Start Date"], "DD/MM/YY").format(),
                endDate: moment(p["Stage2 End Date"], "DD/MM/YY").format()
            } : undefined
        ])
    }))

    const projectsClean = (await Promise.all(projects)).map(compactObject); 

    const projectStages = flatten(projectsClean.map((p: any) => p.stages.map((stage: any) => ({
        projectId: p.id, 
        ...stage
    }))))

    const projectsVeryClean = projectsClean.map(omit("stages"))


    console.log(inspect(projectsVeryClean, { depth: null, colors: true }))
    console.log(projectStages);


    // return Promise.all([
    //     prisma.project.createMany({ data: projectsVeryClean }),
    //     prisma.projectStage.createMany({ data: projectStages }),
    // ]).then((results) => console.log(results));
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
