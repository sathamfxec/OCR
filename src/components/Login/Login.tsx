import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./../../reducer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState<any>({
    uname: "",
    pwd: "",
    errorMsgs: {
      uname: "",
      pwd: "",
      login: "",
    },
  });
  /**
   * Method to handle the login submit
   * @param event
   */
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (
      loginData.uname === "admin@gmail.com" &&
      loginData.pwd === "admin"
    ) {
      dispatch(login(true));
      let userDetails = JSON.stringify({name: 'D MANIKANDAN', fname: 'DURAISAMY'})
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("userDetails", userDetails);
      navigate("/welcome");
    } else {
      setLoginData({
        ...loginData, ["errorMsgs"]: {login: "Enter valid credentials"},
      });
    }
  };
  /**
   * Method to handle the input change
   * @param event
   */
  const handleOnChange = (event: any) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <React.Fragment>
      <div className="Login">
        <div className="container mt-5">
          <div className="row justify-content-between">
            <div className="imgDiv col-sm-6 mt-3">
              <img src="https://www.visor.ai/wp-content/uploads/ocr-artigo-29.jpg" />
            </div>
            <div className="formDiv col-lg-3 col-md-4 col-sm-4 mt-4">
              <form onSubmit={handleSubmit} className="p-3">
                <div className="mb-3">
                  <label htmlFor="uname" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="uname"
                    placeholder="Enter user name"
                    name="uname"
                    value={loginData.uname}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3 mt-3">
                  <label htmlFor="pwd" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="pwd"
                    placeholder="Enter password"
                    name="pwd"
                    value={loginData.pwd}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mt-3 d-flex justify-content-end">
                  <button className="btn btn-danger" type="submit">
                    Login
                  </button>
                </div>
                {loginData.errorMsgs.login &&
                <div className="mt-3 d-flex justify-content-end error" >
                  {loginData.errorMsgs.login}
                </div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
