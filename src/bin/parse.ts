type CSVProjectType = {
    Name: string;
    ParentType: string;
};

export const parseProjectTypes = (data: CSVProjectType[]) =>
    data.map((d: CSVProjectType) => ({
        name: d.Name,
        parentType: d.ParentType,
    }));
