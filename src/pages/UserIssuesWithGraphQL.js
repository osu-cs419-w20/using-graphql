import React from 'react';

import UserHeader from '../components/UserHeaderForGraphQL';
import ReposList from '../components/ReposListForGraphQL';

function UserIssues() {
  const login = 'octocat';
  const haveToken = !!process.env.REACT_APP_NOT_SECRET_GITHUB_TOKEN;

  return (
    <div>
      {haveToken ? (
        <>
          <p>Let's work on loading some data...</p>
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
