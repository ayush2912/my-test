import prisma from './prisma';

const getProject = async (projectId: string) =>
    prisma.project.findUnique({
        where: {
            id: projectId
        },
        include: {
            engagements: {
                orderBy: [
                    { startDate: 'asc' },
                    { type: 'desc' },
                ],
                include: {
                    tasks: {
                        orderBy: [
                            { startDate: 'asc' },
                            { type: 'desc' },
                        ]
                    }
                }
            }
        },
    });

export { getProject };
