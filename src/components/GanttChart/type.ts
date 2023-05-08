type EngagementGroup = {
  project: {
    name: string;
  };
  engagement: {
    name: string;
  };
  task: {
    type: string;
    state: string;
    isOverdue: boolean;
    startDate: Date;
    dueDate: Date;
    completedDate: Date;
  }[];
};
