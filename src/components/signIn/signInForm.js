import React, { useState } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import formLogo from "../img/padlock.svg";
import "../index.scss";

export default function SignInForm() {
  let data = localStorage.getItem("data");
  data = JSON.parse(data);
  console.log(data);
  const [loginValue, setLoginValue] = useState(data ? data.login : "");
  const [passwordValue, setPasswordValue] = useState(data ? data.password : "");
  const [isUserAuthorizated, setIsUserAuthorizated] = useState(false);
  const [authorizationMessage, setAuthorizationMessage] = useState("");
  const [rememberUser, setrememberUser] = useState(false);

  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  const signIn = () => {
    if (loginValue && passwordValue && user) {
      if (loginValue === user.login && passwordValue === user.password) {
        setIsUserAuthorizated(true);
        setAuthorizationMessage("User is autorizated");
      } else {
        setIsUserAuthorizated(false);
        setAuthorizationMessage("uncorrect login or password");
      }
    }
    if (rememberUser) {
      const data = {
        login: user.login,
        password: user.password,
      };
      localStorage.setItem("data", JSON.stringify(data));
    }
  };

  return (
    <form className="form">
      <div className="logo-block">
        <img src={formLogo} />
      </div>
      <h1 className="form-title">Sign In</h1>
      <div className="input-block">
        <input
          name="Login"
          className="input-feld"
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
          placeholder="Login"
        />
      </div>
      <div className="input-block">
        <input
          type="Password"
          className="input-feld"
          placeholder="Password"
          name="password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
      </div>
      <div className="checkbox-block">
        <input
          type="checkbox"
          checked={rememberUser}
          onChange={() => setrememberUser(!rememberUser)}
        />
        <label className="checkbox-block-text">Remember me</label>
      </div>
      <input className="btn" value="Sign in" onClick={signIn} />
      <p
        className={
          isUserAuthorizated ? "loginned-user" : "authorization-failed"
        }
      >
        {authorizationMessage}
      </p>
      <div className="links-block">
        <a className="link">Forgot password</a>
        <NavLink className="link" to="/signup">
          Dont have an account? Sign up
        </NavLink>
      </div>
    </form>
  );
}
