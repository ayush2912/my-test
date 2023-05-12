import { parse } from 'csv-parse/sync';
import axios from 'axios';

export const loadDataFromCSV = (string: string) =>
    parse(string.trim(), {
        columns: true,
        skip_empty_lines: true,
    });

export const readDataFromUrl = async (url: string) => {
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data.map((c: any) => ({
            name: c.name,
            iso2: c.iso2,
            iso3: c.iso3,
        }));
    } catch (error) {
        throw new Error(`Failed to read data from URL: ${error}`);
    }
};
