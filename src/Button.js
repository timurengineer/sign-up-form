import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";

export const button = {
  width: "100%",
  lineHeight: 2.9,
  textAlign: "center",
  borderRadius: "3px",
  backgroundColor: "#036",
  color: "#FFFFFF",
  border: "1px solid #036",
  outline: "none",
  cursor: "pointer",
  fontFamily: "inherit",
  fontSize: "inherit",
  letterSpacing: "0.8px",
  transition: ".2s ease-in-out",
  ":hover": {
    backgroundColor: "#00264d",
    border: "solid 1px #00264d"
  },
  ":disabled": {
    backgroundColor: "rgba(0, 0, 0, .12)",
    border: "none",
    color: "rgba(0, 0, 0, .38)"
  }
};

const Button = ({ children, className, ...other }) => (
  <button type="submit" className={css(button, className)} {...other}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

Button.defaultProps = {
  children: <span>Submit</span>,
  className: ""
};

export default Button;
