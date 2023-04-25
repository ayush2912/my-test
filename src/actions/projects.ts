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

export { getProject };
