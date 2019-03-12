import React, { useState } from 'react';
import { css } from 'emotion';
import './App.css';
import TextInput from './TextInput';
import Button from './Button';

const validators = [
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

export const hasErrors = (password, validators) => {
  return validators.reduce((acc, item) => {
    if (acc) {
      return acc;
    }
    return item.test(password) ? null : item.message
  }, null);
}

const title = {
  textAlign: 'center',
}

const form = {
  padding: '0 12px',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '500px',
}

const submitButton = {
  margin: '12px 0 0',
}

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const onFormSubmit = (event) => {
    event.preventDefault()
    console.log('submit!')
  };

  return (
    <div className="App">
      <h1 className={css(title)}>Sign Up</h1>
      <form onSubmit={onFormSubmit} className={css(form)}>
        <TextInput
          name="username"
          id="username"
          label="Username"
          value={username}
          onChange={event => setUsername(event.target.value)}
          autoFocus
        />
        <TextInput
          type="password"
          id="password"
          name="password"
          label="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          errorMessage={hasErrors(password, validators)}
        />
        <TextInput
          type="password"
          id="confirm"
          name="confirm"
          label="Confirm Password"
          value={confirm}
          onChange={event => setConfirm(event.target.value)}
        />
        <Button
          type="submit"
          className={css(submitButton)}
        >
          Continue
        </Button>
      </form>
    </div>
  )
}

export default App;
