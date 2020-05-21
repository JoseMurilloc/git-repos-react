import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading';
import Container from '../../components/Container';

import api from '../../services/api';

import { Loading, Owner, IssueList } from './styles';

class Repository extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    repository: {},
    issues: [],
    loading: false,
  };

  async componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const repoName = params.repository;

    this.setState({
      loading: true,
    });

    const [repos, issue] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repos.data,
      issues: issue.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;
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
                      {/* {issue.labels((label) => (
                        <span key={String(label.id)}>{label.name}</span>
                      ))} */}
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
}

export default Repository;
