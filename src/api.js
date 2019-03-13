const rejectApiError = (response) => {
  if (response.status === 400) {
    return response.json()
      .then((body) => {
        const error = new Error(body.message && body.message);

        error.name = 'ApiError';
        error.body = body;

        return Promise.reject(error);
      })
  }

  return Promise.reject(new Error('Unknown API error'));
}

const apiCall = (endpoint, options) => {
  const opts = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  return fetch(endpoint, opts)
    .then((response) => response.ok ? response : rejectApiError(response))
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
