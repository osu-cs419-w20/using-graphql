import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import UserHeader from '../components/UserHeaderForGraphQL';
import ReposList from '../components/ReposListForGraphQL';

const GET_USER_DATA = gql`
query GetUserData($login: String!) {
  user(login: $login) {
    name
    url
    avatarUrl(size: 50)
    repositories(first: 10, orderBy: {
      field: UPDATED_AT,
      direction: DESC
    }) {
      nodes {
        name
        url
        issues(first: 3, states: OPEN, orderBy: {
          field: CREATED_AT,
          direction: DESC
        }) {
          nodes {
            title
            url
            createdAt
          }
        }
      }
    }
  }
}
`;

function UserIssues() {
  const login = 'octocat';
  const haveToken = !!process.env.REACT_APP_NOT_SECRET_GITHUB_TOKEN;
  const { data, loading, error, refetch } = useQuery(GET_USER_DATA, {
    variables: { login: login },
    // pollInterval: 1000
  });

  console.log("== data:", data);
  return (
    <div>
      {haveToken ? (
        <>
          <button onClick={() => refetch()}>Refresh</button>
          {loading && <p>Loading...</p>}
          {error && <p>Error...</p>}
          {data && data.user && (
            <>
              <UserHeader login={login} user={data.user} />
              <ReposList repos={data.user.repositories.nodes} />
            </>
          )}
        </>
      ) : (
        <p>
          Rerun with a valid <a href="https://help.github.com/articles/creating-an-access-token-for-command-line-use/">GitHub OAuth Token</a> set in the environment variable <code>REACT_APP_NOT_SECRET_GITHUB_TOKEN</code>
        </p>
      )}
    </div>
  );
}

export default UserIssues;
