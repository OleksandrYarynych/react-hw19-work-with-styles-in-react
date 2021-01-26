import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import formLogo from "../img/padlock.svg";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [sendEmails, setSendEmails] = useState(false);
  const [isFirstNameValueValid, setIsFirstNameValueValid] = useState(false);
  const [isLastNameValueValid, setIsLastNameValueValid] = useState(false);
  const [isLoginValueValid, setIsLoginValueValid] = useState(false);
  const [isPasswordValueValid, setIsPasswordValueValid] = useState(false);

  useEffect(() => {
    if (firstName.length >= 3) setIsFirstNameValueValid(true);
    else setIsFirstNameValueValid(false);
    if (lastName.length >= 3) setIsLastNameValueValid(true);
    else setIsLastNameValueValid(false);
  }, [firstName, lastName]);

  useEffect(() => {
    const regularExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setIsLoginValueValid(regularExpression.test(login));
  }, [login]);

  useEffect(() => {
    const regularExpression = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
    setIsPasswordValueValid(regularExpression.test(password));
  });

  const isEveryFeldNotEmpty =
    setIsFirstNameValueValid &&
    setIsLastNameValueValid &&
    setIsLoginValueValid &&
    setIsPasswordValueValid;

  const sendDataToLocalStorrage = () => {
    if (isEveryFeldNotEmpty()) {
      const user = {
        firstName:
          firstName[0].toUpperCase() + firstName.slice(1).toLowerCase(),
        lastName: lastName[0].toUpperCase() + lastName.slice(1).toLowerCase(),
        login: login,
        password: password,
        sendEmails: sendEmails,
      };

      localStorage.setItem("user", JSON.stringify(user));
      setFirstName("");
      setLastName("");
      setLogin("");
      setPassword("");
      setSendEmails(false);
    }
  };

  return (
    <form className="form">
      <div className="logo-block">
        <img src={formLogo} />
      </div>
      <h1 className="form-title">Sign UUp</h1>
      <div className="input-block two-blocks-in-line">
        <div className="input-block">
          <input
            type="text"
            placeholder="First Name"
            className={
              !firstName
                ? "input-feld"
                : isFirstNameValueValid
                ? "input-feld input-feld-succesfull"
                : "input-feld input-feld-not-succesfull"
            }
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input-block">
          <input
            type="text"
            placeholder="Last Name"
            className={
              !lastName
                ? "input-feld"
                : isLastNameValueValid
                ? "input-feld input-feld-succesfull"
                : "input-feld input-feld-not-succesfull"
            }
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="input-block">
        <input
          type="text"
          placeholder="Email"
          className={
            !login
              ? "input-feld"
              : isLoginValueValid
              ? "input-feld input-feld-succesfull"
              : "input-feld input-feld-not-succesfull"
          }
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div className="input-block">
        <input
          type="password"
          placeholder="Password"
          className={
            !password
              ? "input-feld"
              : isPasswordValueValid
              ? "input-feld input-feld-succesfull"
              : "input-feld input-feld-not-succesfull"
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="checkbox-block">
        <input
          type="checkbox"
          checked={sendEmails}
          onChange={() => setSendEmails(!sendEmails)}
        />
        <label className="checkbox-block-text">
          I want to receive information, making promotions and updates via email
        </label>
      </div>
      <input
        className="btn"
        onClick={sendDataToLocalStorrage}
        value="Sign Up"
      />
      <NavLink className="link down-link" to="/signin">
        Allready have an account? Sign in
      </NavLink>
    </form>
  );
}
