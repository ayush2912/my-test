import { prisma, Prisma } from './prisma';
import { TaskSchema } from './tasks';

const EngagementSchema: Prisma.EngagementSelect = {
    id: true,
    projectId: true,
    startDate: true,
    dueDate: true,
    completedDate: true,
    type: true,
    state: true,
    notes: true,
    attributes: {
        select: {
            name: true,
            type: true,
            value: true,
            key: true,
        },
    },
    stateHistory: {
        select: {
            state: true,
            stateUpdatedAt: true,
        },
    },
    tasks: {
        select: TaskSchema,
        orderBy: [{ startDate: 'asc' }, { type: 'asc' }],
    },
    createdAt: true,
    updatedAt: true,
};

const createEngagement = (data: any) =>
    prisma.engagement.create({
        data: {
            project: {
                connect: {
                    id: data.projectId,
                },
            },
            type: data.type,
            startDate: data.startDate,
            dueDate: data.dueDate,
            attributes: data.attributes,
            state: data.state,
            stateHistory: data.stateHistory,
            notes: data.notes,
            tasks: {
                create: data.tasks,
            },
        },
        select: EngagementSchema,
    });

function getUpdateAttributeMutation(attribute: any) {
    return {
        updateMany: {
            where: {
                key: attribute.key,
            },
            data: {
                value: attribute.value,
            },
        },
    };
}

const updateEngagement = async (engagementId: string, data: any) => {
    const attributes = data.attributes;
    delete data['attributes'];
    if (attributes.length > 0) {
        data['attributes'] = getUpdateAttributeMutation(attributes[0]);
    }
    if (attributes.length > 1) {
        const transactions = [
            {
                where: {
                    id: engagementId,
                },
                data: data,
            },
        ];
        for (let i = 1; i < attributes.length; i++) {
            const attribute = attributes[i];
            transactions.push({
                where: {
                    id: engagementId,
                },
                data: {
                    attributes: getUpdateAttributeMutation(attribute),
                },
            });
        }
        try {
            const transactionPromises = transactions.map((transaction) =>
                prisma.engagement.update({
                    where: transaction.where,
                    data: transaction.data,
                    select: EngagementSchema,
                })
            );
            await prisma.$transaction(transactionPromises);
        } catch (error) {
            console.error('Failed to append transactions:', error);
        }
        return prisma.engagement.findUnique({
            where: {
                id: engagementId,
            },
            select: EngagementSchema,
        });
    } else {
        return prisma.engagement.update({
            where: {
                id: engagementId,
            },
            data: data,
            select: EngagementSchema,
        });
    }
};

const deleteEngagement = (engagementId: string) =>
    prisma.engagement.delete({
        where: {
            id: engagementId,
        },
    });

const deleteEngagementsByStrapiIds = async (strapiIds: string[]) =>
    prisma.engagement.deleteMany({
        where: {
            strapiId: { in: strapiIds },
        },
    });

export {
    createEngagement,
    deleteEngagement,
    updateEngagement,
    EngagementSchema,
    deleteEngagementsByStrapiIds,
};
