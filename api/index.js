const express = require('express');

const { User } = require('./db');

const app = express();
const port = 3001;

app.use(express.json())

app.post('/users', (req, res) => {
  const user = new User();

  user.username = req.body.username;
  user.password = req.body.password;

  user.save((error, newUser) => {
    if (error) {
      return res.json(error);
    }

    res.json(newUser);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
