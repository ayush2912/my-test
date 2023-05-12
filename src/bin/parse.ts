type CSVProjectType = {
    Name: string;
    ParentType: string;
};

type CSVMethodologies = {
    Registry: string;
    Code: string;
    Name: string;
    FullName: string;
};

export const parseProjectTypes = (data: CSVProjectType[]) =>
    data.map((d: CSVProjectType) => ({
        name: d.Name,
        parentType: d.ParentType,
    }));

export const parseCountries = (data: string) => JSON.parse(data);

export const parseMethodologies = (data: CSVMethodologies[]) =>
    data.map((d: CSVMethodologies) => ({
        registry: d.Registry,
        code: d.Code,
        name: d.Name,
        fullName: d.FullName,
    }));
