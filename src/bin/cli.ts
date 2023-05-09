#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'fs';

import { parseProjectTypes } from './parse';
import { loadDataFromCSV } from './utils';
import { seedProjectTypes } from './seed';
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

const list = program.command('list').description('List items from database');

list.command('projectTypes')
    .description('List Project Types from database')
    .action(async () => {
        const results = await listProjectTypes();
        console.log(JSON.stringify(results, null, 2));
    });

program
    .command('test')
    .description('Test command that outputs Hello World')
    .action(() => {
        console.log('Hello world!');
    });

program.parse();
