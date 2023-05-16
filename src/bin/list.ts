import { prisma } from '../actions/prisma';

export const listProjectTypes = () =>
    prisma.projectType.findMany({
        select: {
            id: true,
            name: true,
            parentType: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
