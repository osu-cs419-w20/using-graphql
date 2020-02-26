import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

import UserHeader from '../components/UserHeader';
import ReposList from '../components/ReposList';

function UserIssues() {
  const login = 'octocat';
  const [ tokenInput, setTokenInput ] = useState(null);
  const [ token, setToken ] = useState(null);
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
  }, [ login, token ]);

  return (
    <>
      {token ? (
        <div>
          {user.name ? <UserHeader login={login} user={user} /> : <p>Loading user...</p>}
          {repos.length ? <ReposList repos={repos} /> : <p>Loading repos...</p>}
        </div>
      ) : (
        <form onSubmit={() => setToken(tokenInput)}>
          <h2>
            Enter a <a href="https://help.github.com/articles/creating-an-access-token-for-command-line-use/">GitHub OAuth Token</a>
          </h2>
          <input
            type="password"
            placeholder="GitHub OAuth Token"
            value={tokenInput}
            onChange={e => setTokenInput(e.target.value)}
          />
          <button>Submit</button>
        </form>
      )}
    </>
  );
}

export default UserIssues;
