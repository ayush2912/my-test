import { Prisma, PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();

const TaskSchema: Prisma.TaskSelect = {
    id: true,
    engagementId: true,
    createdAt: true,
    updatedAt: true,
    type: true,
    startDate: true,
    dueDate: true,
    completedDate: true,
    state: true,
    stateHistory: {
        select: {
            state: true,
            stateUpdatedAt: true,
        },
    },
};

const createTasks = async (
    data: {
        id?: string;
        type: string;
        startDate: Date;
        dueDate: Date;
        engagementId: string;
        stateHistory?: {
            state: string;
            stateUpdatedAt: Date;
        }[];
    }[]
) => {
    const mongodbIds = [];
    for (let i = 0; i < data.length; i++) {
        mongodbIds.push(new ObjectId().toHexString());
        data[i].id = mongodbIds[i];
    }
    await prisma.task.createMany({
        data: data,
    });
    return await prisma.task.findMany({
        where: {
            id: {
                in: mongodbIds,
            },
        },
        select: TaskSchema,
    });
};

const updateTask = async (
    taskId: string,
    data: {
        startDate?: Date;
        dueDate?: Date;
        engagementId?: string;
        completedDate?: string;
    }
) =>
    prisma.task.update({
        data: data,
        where: {
            id: taskId,
        },
    });

const deleteTask = async (taskId: string) =>
    prisma.task.delete({
        where: {
            id: taskId,
        },
    });

export { createTasks, updateTask, deleteTask };
