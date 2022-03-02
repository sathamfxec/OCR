import React from "react";
import PropTypes from "prop-types";
import "./Header.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./../../reducer";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.login.value);
  const isAuth = localStorage.getItem("isAuth");
  /**
   * Method to handle the logout
   */
  const logout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("userDetails");
    dispatch(login(false));
    navigate("/login");
  };
  return (
    <React.Fragment>
      <header className="Header flex-ai" data-testid="Header">
        <nav className="col-sm-12">
          <ul className="navUl flex-sb">
            <li className="logo">
              <img src="https://cdn.sick.com/media/ZOOM/2/82/782/IM0077782.png" />
            </li>
            {selector || isAuth === "true" ? (
              <li className="logOut">
                <label onClick={() => logout()}>Logout</label>
              </li>
            ) : (
              ""
            )}
          </ul>
        </nav>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
