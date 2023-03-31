import fetch from "isomorphic-unfetch";

import config from "../config";

const FindUserQuery = `
  query User($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
    }
  }
`;

export const findUserByAccessToken = (accessToken: string) => {
  return fetch(config.GQL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: FindUserQuery,
      variables: {
        where: {
          accessToken,
        },
      },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data.user);
};
