import { prisma } from '../actions/prisma';

type ProjectTypeData = {
    name: string;
    parentType: string;
};

type Countries = {
    name: string;
    iso2: string;
    iso3: string;
};

export const seedProjectTypes = async (data: ProjectTypeData[]) => {
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
                        )?.id,
                    },
                    create: {
                        name: r.name,
                        parentId: parentTypes.find(
                            (p) => p.name === r.parentType
                        )?.id,
                    },
                })
            )
    );

    return {
        parentTypes,
        subTypes,
    };
};

export const seedCountries = async (data: Countries[]) => {
    const countries = await prisma.$transaction(
        data.map((item) =>
            prisma.country.upsert({
                where: {
                    iso2Name: item.iso2,
                },
                update: {
                    name: item.name,
                    iso3Name: item.iso3,
                    iso2Name: item.iso2,
                },
                create: {
                    name: item.name,
                    iso3Name: item.iso3,
                    iso2Name: item.iso2,
                },
            })
        )
    );
    return countries;
};
