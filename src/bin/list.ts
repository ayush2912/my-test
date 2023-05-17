import { prisma } from '../actions/prisma';

export const listProjects = ({ organizationId }: { organizationId: string }) =>
    prisma.project.findMany({
        where: {
            organizationId: organizationId,
        },
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            registry: {
                select: {
                    name: true,
                },
            },
            registryProjectId: true,
            countries: {
                select: {
                    iso2Name: true,
                    name: true,
                },
            },
            types: {
                select: {
                    id: true,
                    name: true,
                },
            },
            subTypes: {
                select: {
                    id: true,
                    name: true,
                },
            },
            portfolioOwner: {
                select: {
                    id: true,
                    name: true,
                },
            },
            assetOwners: {
                select: {
                    id: true,
                    name: true,
                },
            },
            annualApproximateCreditVolume: true,
            engagements: {
                where: {
                    startDate: {
                        lte: new Date(),
                    },
                },
                select: {
                    id: true,
                    type: true,
                    dueDate: true,
                    completedDate: true,
                    state: true,
                },
                orderBy: [{ startDate: 'desc' }, { createdAt: 'desc' }],
                take: 1,
            },
        },
    });

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
