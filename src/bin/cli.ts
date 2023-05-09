#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'fs';
import { loadDataFromCSV } from './utils';
import { prisma } from '../actions/prisma';

const program = new Command();

program
    .name('offsetmax')
    .description('CLI to some Offsetmax utilities')
    .version('0.0.1');

const parse = program
    .command('parse')
    .description('Parse data into JSON objects');

parse
    .command('taskTypes')
    .argument('<path>', 'file path to the CSV file')
    .description('Parse Task Type CSV file into JSON objects')
    .action((path) => {
        const string = readFileSync(path, 'utf-8');
        const data = loadDataFromCSV(string);
        const results = data.map((item: any) => ({
            registry: item.registry,
            engagementType: item.engagement_type,
            taskType: item.task_type,
        }));
        console.log(JSON.stringify(results, null, 2));
    });

parse
    .command('projectTypes')
    .argument('<path>', 'file path to the CSV file')
    .description('Parse Project Type CSV files into JSON objects')
    .action((path) => {
        const string = readFileSync(path, 'utf-8');
        const data = loadDataFromCSV(string);
        const results = data.map((d: any) => ({
            name: d.Name,
            parentType: d.ParentType,
        }));
        // const results = data.map((item: any) => ({
        //     registry: item.registry,
        //     engagementType: item.engagement_type,
        //     taskType: item.task_type,
        // }));
        console.log(JSON.stringify(results, null, 2));
    });

const seed = program.command('seed').description('Seed data into database');

seed.command('projectTypes')
    .argument('<path>', 'file path to the CSV file')
    .description('Seed Project Types into database from CSV file')
    .action(async (path) => {
        const string = readFileSync(path, 'utf-8');
        const data = loadDataFromCSV(string).map((d: any) => ({
            name: d.Name,
            parentType: d.ParentType,
        }));

        const parentTypes = await prisma.$transaction(
            data
                .filter((r: any) => r.parentType === '')
                .map(({ name }: { name: string }) =>
                    prisma.projectType.upsert({
                        where: {
                            name: name,
                        },
                        update: {
                            // name: 'Viola the Magnificent',
                        },
                        create: {
                            name: name,
                        },
                    })
                )
        );

        const subTypes = await prisma.$transaction(
            data
                .filter((r: any) => r.parentType !== '')
                .map((r: any) =>
                    prisma.projectType.upsert({
                        where: {
                            name: r.name,
                        },
                        update: {
                            name: r.name,
                            parentId: parentTypes.find(
                                (p) => p.name === r.parentType
                            ).id,
                        },
                        create: {
                            name: r.name,
                            parentId: parentTypes.find(
                                (p) => p.name === r.parentType
                            ).id,
                        },
                    })
                )
        );

        console.log({ parentTypes, subTypes });

        console.log(
            `Created ${parentTypes.length} Project Parent Types, ${subTypes.length} Project Subtypes`
        );

        // prisma.projectType.createMany([])

        // prisma.projectType.create({
        //     data: {
        //         name: 'asd',
        //         parentType: {
        //             connect: {
        //                 name: 'Fuel Transport',
        //             },
        //         },
        //     },
        // });
    });

const list = program.command('list').description('List items from database');

list.command('projectTypes')
    .description('List Project Types from database')
    .action(async () => {
        const results = await prisma.projectType.findMany({
            select: {
                id: true,
                name: true,
                parentType: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        console.log(JSON.stringify(results, null, 2));
    });

program
    .command('test')
    .description('Test command that outputs Hello World')
    .action(() => {
        console.log('Hello world!');
    });

program.parse();
