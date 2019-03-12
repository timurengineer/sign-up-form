import React from 'react';
import ReactDOM from 'react-dom';
import App, { hasErrors } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('hasErrors()', () => {
  it('returns proper message if length is less than minLength', () => {
    expect(hasErrors('foo', { minLength: 8 }))
      .toEqual('Must be at least 8 characters')
  })

  it('returns proper message if length is more than maxLength', () => {
    expect(hasErrors('foobarbaz', { maxLength: 8 }))
      .toEqual('Must be at most 8 characters')
  })

  it('returns null if length is valid', () => {
    expect(hasErrors('foobarbaz', { minLength: 8, maxLength: 10 }))
      .toEqual(null)
  })
})
