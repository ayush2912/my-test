interface StateHistoryInputData {
    state: string;
    stateUpdatedAt: Date;
};

interface createTaskData {
    id?: string;
    type: string;
    startDate: Date;
    dueDate: Date;
    engagementId: string;
    stateHistory?: StateHistoryInputData[];
}[];

interface updateTaskData {
    startDate?: Date;
    dueDate?: Date;
    engagementId?: string;
    completedDate?: string;
}

export { createTaskData, updateTaskData };