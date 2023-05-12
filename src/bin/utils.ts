import { parse } from 'csv-parse/sync';

export const loadDataFromCSV = (string: string) =>
    parse(string.trim(), {
        columns: true,
        skip_empty_lines: true,
    });
