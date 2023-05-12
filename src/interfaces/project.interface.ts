interface QueryParams {
    organizationIds: string[];
    take: number;
    skip: number;
    tab: string;
}

interface GetProjectListInput {
    organizationIds: string[];
    take: number;
    skip: number;
    tab: string;
}

interface GetProjectEngagementsInput {
    organizationIds: string[];
    take: number;
    skip: number;
}

export { QueryParams, GetProjectListInput, GetProjectEngagementsInput };
