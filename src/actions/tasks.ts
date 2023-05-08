import { ObjectId } from 'bson';

import { prisma, Prisma } from './prisma';
import { createTaskData, updateTaskData } from '../interfaces/task.interface';

const TaskSchema: Prisma.TaskSelect = {
    id: true,
    engagementId: true,
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
    createdAt: true,
    updatedAt: true
};

const createTasks = async (data: createTaskData[]) => {
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

const updateTask = async (taskId: string, data: updateTaskData) =>
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
