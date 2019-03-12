import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const container = {
  display: 'flex',
  flexDirection: 'column-reverse',
  paddingBottom: '16px',
};

const input = {
  appearance: 'none',
  fontFamily: 'inherit',
  fontSize: '16px',
  padding: '10px 16px',
  backgroundColor: '#ffffff',
  outline: 'none',
  color: 'rgb(0,0,0,.87)',
  borderRadius: '3px',
};

const labelStyle = {
  fontFamily: 'inherit',
  fontSize: '12px',
  color: 'rgb(0,0,0,.5)',
  padding: '0 0 4px 16px',
};

const labelError = {
  color: '#B00020',
};

const helperStyle = {
  fontFamily: 'inherit',
  fontSize: '12px',
  color: 'rgb(0,0,0,.5)',
  padding: '2px 16px 0',
};

const errorContainer = {
  color: '#B00020',
  fontSize: 12,
  padding: '2px 12px 0',
};

const TextInput = React.forwardRef(
  ({
    className, errorMessage, label, helperText, small, id, ...other
  }, ref) => (
    <div className={css(container)}>
      {errorMessage && (
        <div className={css(errorContainer)}>{errorMessage}</div>
      )}
      {!errorMessage && helperText && (
        <div className={css(helperStyle)}>{helperText}</div>
      )}
      <input
        id={id}
        type="text"
        size={10}
        className={css({
          ...input,
          height: small ? '40px' : '50px',
          border: errorMessage ? '2px solid #B00020' : 'solid 1px rgb(0,0,0,.5)',
          ':focus': {
            border: errorMessage ? '2px solid #B00020' : '2px solid #036',
          },
          ':focus ~ label': {
            color: errorMessage ? '#B00020' : '#036',
          },
        }, className)}
        {...other}
        ref={ref}
      />
      <label
        htmlFor={id}
        className={css(labelStyle, errorMessage && labelError)}
      >
        {label}
      </label>
    </div>
  ),
);

TextInput.propTypes = {
  className: PropTypes.string,
  errorMessage: PropTypes.node,
  label: PropTypes.node,
  helperText: PropTypes.node,
  small: PropTypes.bool,
  id: PropTypes.string,
};

TextInput.defaultProps = {
  className: '',
  errorMessage: '',
  label: '',
  helperText: '',
  small: false,
  id: '',
};

export default TextInput;
