import React, { useState } from 'react';
import { css } from 'emotion';
import './App.css';
import TextInput from './TextInput';

const title = {
  textAlign: 'center',
}

const form = {
  padding: '0 12px',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '500px',
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
        />
        <TextInput
          type="password"
          id="confirm"
          name="confirm"
          label="Confirm Password"
          value={confirm}
          onChange={event => setConfirm(event.target.value)}
        />
      </form>
    </div>
  )
}

export default App;
