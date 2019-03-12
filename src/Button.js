import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

export const button = {
  width: '100%',
  lineHeight: 2.9,
  textAlign: 'center',
  borderRadius: '0',
  backgroundColor: '#697EFF',
  color: '#FFFFFF',
  border: '1px solid #697EFF',
  outline: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  letterSpacing: '0.8px',
  transition: '.2s ease-in-out',
  ':hover': {
    backgroundColor: '#6073E8',
    border: 'solid 1px #6073E8',
  },
  ':disabled': {
    backgroundColor: 'rgba(0, 0, 0, .12)',
    border: 'none',
    color: 'rgba(0, 0, 0, .38)',
  },
};

const Button = ({ children, className, ...other }) => (
  <button
    className={css(button, className)}
    {...other}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Button.defaultProps = {
  children: <span>Submit</span>,
  className: '',
}

export default Button;
