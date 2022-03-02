import React from "react";
import PropTypes from "prop-types";
import "./Footer.scss";

const Footer = () => (
  <footer className="flex-ai flex-jc" data-testid="Footer">
    <label>
      Copyright <span>&#169;</span> Satham Hussain
    </label>
  </footer>
);

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
