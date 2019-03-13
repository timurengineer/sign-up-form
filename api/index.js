const express = require('express');

const { User } = require('./db');
const {
  validate,
  usernameValidators,
  passwordValidators
} = require('../src/api');

const app = express();
const port = 3001;

app.use(express.json())

app.post('/users', (req, res) => {
  const usernameError = validate(req.body.username, usernameValidators);
  const passwordError = validate(req.body.password, passwordValidators);
  const user = new User();

  user.username = req.body.username;
  user.password = req.body.password;

  user.save((error, newUser) => {
    if (error) {
      return res.status(400).json(error);
    }

    if (usernameError) {
      return res.status(400).json({
        name: 'ValidationError',
        username: {
          message: usernameError,
        },
        message: usernameError,
      })
    }
  
    if (passwordError) {
      return res.status(400).json({
        name: 'ValidationError',
        password: {
          message: passwordError,
        },
        message: passwordError,
      })
    }

    res.json(newUser);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
