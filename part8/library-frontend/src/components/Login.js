/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button } from 'react-bootstrap';
import { LOGIN } from '../queries';

const LoginForm = ({ setToken, show, setPage }) => {
  if (!show) {
    return null;
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    // onError: (error) => {
    //   console.log(error.graphQLErrors[0].message);
    // },
    onCompleted: () => { setPage('authors'); },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('loggedUser', token);
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div style={{ width: '30%', margin: 'auto', paddingTop: '20%' }}>
      <h1>Login</h1>
      <Form onSubmit={submit}>
        <Form.Control
          placeholder="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />

        <Form.Control
          placeholder="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        <Button type="submit">login</Button>
      </Form>
    </div>
  );
};

export default LoginForm;
