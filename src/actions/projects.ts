import prisma from './prisma';

const getProject = async (projectId: string) =>
    prisma.project.findUnique({
        where: {
            id: projectId
        },
        include: {
            engagements: {
                orderBy: [
                    { startDate: 'desc' },
                    { type: 'asc' },
                ],
                include: {
                    tasks: {
                        orderBy: [
                            { startDate: 'desc' },
                            { type: 'asc' },
                        ]
                    }
                }
            }
        },
    });

async function name() {

    console.log("hoefoifee",JSON.stringify(await getProject("6446591277702d34031408ca"), null, 2));
}

name();


export { getProject };
