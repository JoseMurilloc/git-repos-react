import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import api from '../../services/api';

function Repository() {
  const { params } = useRouteMatch();
  const [repository, setRepository] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadRepositoryAndIssues() {
      const repoName = params.repository;

      setLoading(true);

      const [repo, issue] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          },
        }),
      ]);

      setRepository([...repository, repo.data]);
      setIssues([...issues, issue.data]);
      setLoading(false);
    }
    loadRepositoryAndIssues();
  }, []);

  return (
    <>
      <h1>Repository</h1>
    </>
  );
}

export default Repository;
