import { Prisma, PrismaClient, Task } from '@prisma/client';

const prisma = new PrismaClient();

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
    }
};

const createTasks = async (data: any) => 
  prisma.task.createMany({
        data: data
    });


const updateTask = async (taskId: string,data: any) =>
    prisma.task.update({
        data: data,
        where: {
            id: taskId
        }
    })

const deleteTask = async (taskId: string) =>
    prisma.task.delete({
        where: {
            id: taskId
        }
    })



export {createTasks, updateTask, deleteTask}