import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

import UserHeader from '../components/UserHeader';
import ReposList from '../components/ReposList';

/*
 * Caution!!!  This is not a safe way to incorporate an authentication token
 * into your app.  The token will be readable by anyone who runs the code.
 * We're doing it this way for ease of demonstration only.
 */
const token = process.env.REACT_APP_NOT_SECRET_GITHUB_TOKEN;

function UserIssues() {
  const login = 'octocat';
  const [ user, setUser ] = useState({});
  const [ repos, setRepos ] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const userRes = await fetch(
        `https://api.github.com/users/${login}`,
        { headers: { Authorization: `token ${token}` } }
      );
      const userResBody = await userRes.json();
      setUser(userResBody);

      const reposRes = await fetch(
        `https://api.github.com/users/${login}/repos?sort=updated`,
        { headers: { Authorization: `token ${token}` } }
      );
      const reposResBody = await reposRes.json();

      const reposWithIssues = await Promise.all(reposResBody.slice(0, 10).map(async repo => {
        const issuesRes = await fetch(
          repo.issues_url.replace("{/number}", ""),
          { headers: { Authorization: `token ${token}` } }
        );
        const issuesResBody = await issuesRes.json();
        repo.issues = issuesResBody.slice(0, 3);
        return repo;
      }));
      setRepos(reposWithIssues);
    }
    if (token) {
      fetchData();
    }
  }, [ login ]);

  return (
    <>
      {token ? (
        <div>
          {user.name ? <UserHeader login={login} user={user} /> : <p>Loading user...</p>}
          {repos.length ? <ReposList repos={repos} /> : <p>Loading repos...</p>}
        </div>
      ) : (
        <p>
          Rerun with a valid <a href="https://help.github.com/articles/creating-an-access-token-for-command-line-use/">GitHub OAuth Token</a> set in the environment variable <code>REACT_APP_NOT_SECRET_GITHUB_TOKEN</code>
        </p>
      )}
    </>
  );
}

export default UserIssues;
