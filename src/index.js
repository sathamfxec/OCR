import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="/login" element={<App />} />
          <Route path="/welcome" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
