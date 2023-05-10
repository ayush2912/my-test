interface QueryParams {
    organizationIds: string
    take: number
    skip: number,
    tab: string
}

interface GetProjectListInput {
    organizationIds: string[]
    take: number
    skip: number
    tab: string
}

export { QueryParams, GetProjectListInput }
