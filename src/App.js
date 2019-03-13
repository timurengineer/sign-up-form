import React, { useState } from 'react';
import { css } from 'emotion';

import './App.css';
import { createUser, validate } from './api';

import TextInput from './TextInput';
import Button from './Button';

const passwordValidators = [
  {
    test: value => value.length > 7,
    message: 'Too short, must be 8 to 20 characters',
  },
  {
    test: value => value.length < 21,
    message: 'Too long, must be 8 to 20 characters',
  },
  {
    test: value => /[a-zA-Z]/.test(value),
    message: 'Must contain at least 1 letter',
  },
  {
    test: value => /[0-9]/.test(value),
    message: 'Must contain at least 1 number',
  },
];

const title = {
  textAlign: 'center',
};

const form = {
  padding: '0 12px',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '500px',
};

const submitButton = {
  margin: '12px 0 0',
};

const App = () => {
  const [submitClicked, setSubmitClicked] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [usernameApiError, setUsernameApiError] = useState('');

  const usernameError = usernameApiError || validate(username, [{
    test: value => value.length > 0,
    message: 'Entert a username',
  }]);
  const passwordError = validate(password, passwordValidators);
  const confirmError = validate(confirm, [{
    test: value => value === password,
    message: 'Does not match',
  }]);

  const resetState = () => {
    setSubmitClicked(false);
    setUsername('');
    setPassword('');
    setConfirm('');
    setUsernameApiError('');
  };

  const onUserCreateError = (error) => {
    if (error.name === 'ApiError' && error.body.name === "ValidationError") {
      const { username } = error.body.errors;
      setUsernameApiError(username && username.message);
    }
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    setSubmitClicked(true);

    if (usernameError || passwordError || confirmError) {
      return null;
    }

    return createUser({ username, password })
      .then(resetState)
      .catch(onUserCreateError);
  };

  const onUsernameChange = (event) => {
    setUsernameApiError('');
    setUsername(event.target.value);
  }

  return (
    <div className="App">
      <h1 className={css(title)}>Sign Up</h1>
      <form onSubmit={onFormSubmit} className={css(form)}>
        <TextInput
          name="username"
          id="username"
          label="Username"
          value={username}
          onChange={onUsernameChange}
          autoFocus
          errorMessage={submitClicked && usernameError}
        />
        <TextInput
          type="password"
          id="password"
          name="password"
          label="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          errorMessage={submitClicked && passwordError}
        />
        <TextInput
          type="password"
          id="confirm"
          name="confirm"
          label="Confirm Password"
          value={confirm}
          onChange={event => setConfirm(event.target.value)}
          errorMessage={submitClicked && confirmError}
        />
        <Button className={css(submitButton)}>
          Continue
        </Button>
      </form>
    </div>
  );
};

export default App;
