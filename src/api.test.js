import { validate } from './api';

describe('validate()', () => {
  it('returns message if validator test does not pass', () => {
    const validator = {
      test: value => value.length > 8,
      message: 'Must be at least 8 characters',
    };
    expect(validate('foo', [
      validator,
    ])).toEqual('Must be at least 8 characters');
  });

  it('returns null if all validator tests pass', () => {
    expect(validate('foobarbaz', [
      {
        test: value => value.length > 8,
        message: 'Too short',
      },
      {
        test: value => value.length < 10,
        message: 'Too long',
      },
    ])).toEqual(null);
  });

  it('returns only the first failed test', () => {
    const validators = [
      {
        test: value => value.length > 7,
        message: 'Too short',
      },
      {
        test: value => value.length < 9,
        message: 'Too long',
      },
    ];

    expect(validate('foobar', validators)).toEqual('Too short');
    expect(validate('foobarbaz', validators)).toEqual('Too long');
  });
});
