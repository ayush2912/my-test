interface QueryParams {
    organizationIds: string;
    take: number;
    skip: number;
    tab: string;
}

export interface GetProjectEngagementsInput {
    organizationIds: string[];
    take: number;
    skip: number;
}

interface GetProjectListInput {
    organizationIds: string[];
    take: number;
    skip: number;
    tab: string;
}

export { QueryParams, GetProjectListInput };
