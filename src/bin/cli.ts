#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'fs';

import {
    parseOrganizations,
    parseProjects,
    parseEngagements,
    parseTasks,
    parseProjectTypes,
    parseCountries,
    parseMethodologies,
} from './parse';
import { loadDataFromCSV } from './utils';
import {
    seedOrganizations,
    seedProjects,
    seedEngagements,
    seedTasks,
    seedProjectTypes,
    seedCountries,
    seedMethodologies,
} from './seed';
import { listProjectTypes } from './list';

const program = new Command();

program
    .name('offsetmax')
    .description('CLI to some Offsetmax utilities')
    .version('0.0.1');

const parse = program
    .command('parse')
    .description('Parse data into JSON objects');

parse
    .command('organizations')
    .argument('<path>', 'file path to the CSV file')
    .description('Parse Organizations CSV file into JSON objects')
    .action((path) => {
        const string = readFileSync(path, 'utf-8');
        const data = loadDataFromCSV(string);
        const results = parseOrganizations(data);
        console.log(JSON.stringify(results, null, 2));
    });

parse
    .command('projects')
    .argument('<path>', 'file path to the CSV file')
    .description('Parse Projects CSV file into JSON objects')
    .action((path) => {
        const string = readFileSync(path, 'utf-8');
        const data = loadDataFromCSV(string);
        const results = parseProjects(data);
        console.log(JSON.stringify(results, null, 2));
    });

parse
    .command('engagements')
    .argument('<path>', 'file path to the CSV file')
    .description('Parse Engagements CSV file into JSON objects')
    .action((path) => {
        const string = readFileSync(path, 'utf-8');
        const data = loadDataFromCSV(string);
        const results = parseEngagements(data);
        console.log(JSON.stringify(results, null, 2));
    });

parse
    .command('tasks')
    .argument('<path>', 'file path to the CSV file')
    .description('Parse Tasks CSV file into JSON objects')
    .action((path) => {
        const string = readFileSync(path, 'utf-8');
        const data = loadDataFromCSV(string);
        const results = parseTasks(data);
        console.log(JSON.stringify(results, null, 2));
    });

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
        const results = parseProjectTypes(data);
        console.log(JSON.stringify(results, null, 2));
    });

const seed = program.command('seed').description('Seed data into database');

seed.command('organizations')
    .argument('<path>', 'file path to the CSV file')
    .description('Seed Organizations into database from CSV file')
    .action(async (path) => {
        const string = readFileSync(path, 'utf-8');
        const data = parseOrganizations(loadDataFromCSV(string));

        const organizations = await seedOrganizations(data);

        console.log(`Seeded ${organizations.length} organizations`);
    });

seed.command('projects')
    .argument('<path>', 'file path to the CSV file')
    .description('Seed Organizations into database from CSV file')
    .action(async (path) => {
        const string = readFileSync(path, 'utf-8');
        const data = parseProjects(loadDataFromCSV(string));
        const projects = await seedProjects(data);
        console.log(`Seeded ${projects.length} projects`);
    });

seed.command('engagements')
    .argument('<path>', 'file path to the CSV file')
    .description('Seed Engagements into database from CSV file')
    .action(async (path) => {
        const string = readFileSync(path, 'utf-8');
        const data = parseEngagements(loadDataFromCSV(string)).filter(
            (e) => e.startDate?.length
        );

        const engagements = await seedEngagements(data);

        console.log(`Seeded ${engagements.length} engagements`);
    });

seed.command('tasks')
    .argument('<path>', 'file path to the CSV file')
    .description('Seed Tasks into database from CSV file')
    .action(async (path) => {
        const string = readFileSync(path, 'utf-8');
        const data = parseTasks(loadDataFromCSV(string)).filter(
            (e) => e.startDate?.length
        );

        const tasks = await seedTasks(data);

        console.log(`Seeded ${tasks.length} tasks`);
    });

seed.command('projectTypes')
    .argument('<path>', 'file path to the CSV file')
    .description('Seed Project Types into database from CSV file')
    .action(async (path) => {
        const string = readFileSync(path, 'utf-8');
        const data = parseProjectTypes(loadDataFromCSV(string));

        const { parentTypes, subTypes } = await seedProjectTypes(data);

        console.log(
            `Created ${parentTypes.length} Project Parent Types, ${subTypes.length} Project Subtypes`
        );
    });

seed.command('countries')
    .argument('<path>', 'path for the json data')
    .description('Seed the Countries data into database from json file')
    .action(async (path: string) => {
        const jsonString = readFileSync(path, 'utf-8');
        const data = parseCountries(jsonString);
        const countries = await seedCountries(data);
        console.log(`Created ${countries.length} countries`);
    });

seed.command('methodologies')
    .argument('<path>', 'file path to csv file')
    .description('Seed the methodologies data into database from json file')
    .action(async (path: string) => {
        const string = readFileSync(path, 'utf-8');
        const data = parseMethodologies(loadDataFromCSV(string));
        const methodologies = await seedMethodologies(data);
        console.log(`Created ${methodologies.count} methodologies`);
    });

const list = program.command('list').description('List items from database');

list.command('projectTypes')
    .description('List Project Types from database')
    .action(async () => {
        const results = await listProjectTypes();
        console.log(JSON.stringify(results, null, 2));
    });

parse
    .command('attributeTypes')
    .argument('<path>', 'file path to the CSV file')
    .description('Parse Attribute Type CSV file into JSON objects')
    .action((path) => {
        const string = readFileSync(path, 'utf-8');
        const data = loadDataFromCSV(string);
        const results = data.map((item: any) => ({
            engagementType: item.engagementType,
            name: item.name,
            key: item.key,
            type: item.type,
        }));
        console.log(JSON.stringify(results, null, 2));
    });

program
    .command('test')
    .description('Test command that outputs Hello World')
    .action(() => {
        console.log('Hello world!');
    });

program.parse();
