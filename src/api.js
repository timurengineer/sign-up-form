const rejectApiError = (response) => {
  if (response.status === 400) {
    return response.json()
      .then((body) => {
        const error = new Error(body.message && body.message);

        error.name = 'ApiError';
        error.body = body;

        return Promise.reject(error);
      });
  }

  return Promise.reject(new Error('Unknown API error'));
};

const apiCall = (endpoint, options) => {
  const opts = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  return fetch(endpoint, opts)
    .then(response => (response.ok ? response : rejectApiError(response)))
    .then(response => response.json());
};

export const createUser = body => (
  apiCall('/users', {
    method: 'POST',
    body: JSON.stringify(body),
  })
);

export const validate = (password, validators) => (
  validators.reduce((acc, item) => {
    if (acc) {
      return acc;
    }
    return item.test(password) ? null : item.message;
  }, null)
);

export const passwordValidators = [
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

export const usernameValidators = [{
  test: value => value.length > 0,
  message: 'Entert a username',
}];
