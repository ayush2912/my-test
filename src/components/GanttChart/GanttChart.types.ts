export interface Attribute {
  name: string;
  type: string;
  value: string;
  key: string;
}

export interface Country {
  id: string;
  name: string;
  iso2Name: string;
  iso3Name: string;
}

export interface Registry {
  id: string;
  name: string;
}

export interface Type {
  id: string;
  name: string;
}

export interface StateHistory {
  state: string;
  stateUpdatedAt: string;
}

export type IBar = {
  offsetFromLeft: {
    monthly: number;
    yearly: number;
    weekly: number;
  };
  width: {
    monthly: number;
    yearly: number;
    weekly: number;
  };
};
export interface Task {
  id: string;
  engagementId: string;
  type: string;
  startDate: string;
  dueDate: string;
  completedDate: string | null;
  isOverdue: boolean;
  state: string;
  stateHistory: StateHistory[];
  createdAt: string;
  updatedAt: string;
}

export interface Engagement {
  id: string;
  projectId: string;
  type: string;
  startDate: string;
  dueDate: string;
  completedDate: string | null;
  notes: string;
  state: string;
  stateHistory: StateHistory[];
  isOverdue: boolean;
  attributes: Attribute[];
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectEngagement {
  id: string;
  name: string;
  registry: Registry;
  registryProjectId: string;
  types: Type[];
  countries: Country[];
  isActive: boolean;
  engagements: Engagement[];
  createdAt: string;
  updatedAt: string;
}

export interface IMappedEngagement {
  id: string;
  projectId: string;
  type: string;
  startDate: string;
  dueDate: string;
  completedDate: string | null;
  notes: string;
  state: string;
  stateHistory: StateHistory[];
  isOverdue: boolean;
  attributes: Attribute[];
  createdAt: string;
  updatedAt: string;
  project: {
    id: string;
    name: string;
    registry: Registry;
    registryProjectId: string;
    types: Type[];
    countries: Country[];
    bar: IBar;
    onViewClick: (id: string) => void;
  };
  bar: IBar;
  onViewClick: (id: string) => void;
  tasks: (Task & { bar: IBar })[];
}

export type IMappedEngagements = IMappedEngagement[];
export type IProjectBarData = IMappedEngagement["project"];