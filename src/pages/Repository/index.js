import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import Skeleton from 'react-loading';
import Container from '../../components/Container';

import api from '../../services/api';

import { Loading, Owner, IssueList } from './styles';

function Repository() {
  const { params } = useRouteMatch();
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadRepositoryAndIssues() {
      const repoName = params.repository;

      setLoading(true);

      const [repos, issue] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          },
        }),
      ]);

      setRepository(repos.data);
      setIssues(issue.data);
      setLoading(false);
    }
    loadRepositoryAndIssues();
  }, []);

  return (
    <>
      {loading ? (
        <Loading>
          <Skeleton width={75} height={75} />
        </Loading>
      ) : (
        <Container>
          <Owner>
            <Link to="/">Voltar aos repositórios</Link>
            <img
              src="https://avatars3.githubusercontent.com/u/69631?v=4"
              alt="facebook"
            />
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
          </Owner>
          <IssueList>
            {issues.map((issue) => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels((label) => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))}
          </IssueList>
        </Container>
      )}
    </>
  );
}

export default Repository;
