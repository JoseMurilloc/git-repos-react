import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

class Main extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, preventState) {
    const { repositories } = this.state;

    if (preventState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleOnSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      loading: false,
    });
  };

  render() {
    const { newRepo, loading, repositories } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repository
        </h1>
        <Form onSubmit={this.handleOnSubmit}>
          <input
            type="text"
            placeholder="Adicionar um Repositorio"
            value={newRepo}
            onChange={(e) => this.setState({ newRepo: e.target.value })}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner size={14} color="#fff" />
            ) : (
              <FaPlus size={14} color="#FFF" />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map((repositorie) => (
            <li key={repositorie.name}>
              <span>{repositorie.name}</span>
              <Link to={`/repositories/${repositorie.name}`}>Detalhes</Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
