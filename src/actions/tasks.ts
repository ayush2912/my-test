import { Prisma, PrismaClient } from '@prisma/client';
import { ObjectId } from 'bson';

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

type StateHistoryInputData = {
    state: string;
    stateUpdatedAt: Date;
};

type TaskInputData = {
    id?: string;
    type: string;
    startDate: Date;
    dueDate: Date;
    engagementId: string;
    stateHistory?: StateHistoryInputData[];
}[];

const createTasks = async (data: TaskInputData) => {
    const createManyTaskData = data.map((task) => ({
        id: task.id || new ObjectId().toHexString(),
        ...task,
    }));

    const mongodbIds = createManyTaskData.map((task) => task.id);

    await prisma.task.createMany({
        data: createManyTaskData,
    });

    return prisma.task.findMany({
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
