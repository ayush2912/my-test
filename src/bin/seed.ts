import { prisma } from '../actions/prisma';

type ProjectTypeData = {
    name: string;
    parentType: string;
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
