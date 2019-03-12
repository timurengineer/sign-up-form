import React from 'react';
import ReactDOM from 'react-dom';
import App, { hasErrors } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('hasErrors()', () => {
  it('returns message if validator test does not pass', () => {
    const validator = {
      test: value => value.length > 8,
      message: 'Must be at least 8 characters',
    }
    expect(hasErrors('foo', [
      validator
    ])).toEqual('Must be at least 8 characters')
  })

  it('returns null if all validator tests pass', () => {
    expect(hasErrors('foobarbaz', [
      {
        test: value => value.length > 8,
        message: 'Too short',
      },
      {
        test: value => value.length < 10,
        message: 'Too long',
      }
    ])).toEqual(null)
  })

  it('returns only the first failed test', () => {
    const validators = [
      {
        test: value => value.length > 7,
        message: 'Too short',
      },
      {
        test: value => value.length < 9,
        message: 'Too long',
      }
    ]

    expect(hasErrors('foobar', validators)).toEqual('Too short')
    expect(hasErrors('foobarbaz', validators)).toEqual('Too long')
  })
})
