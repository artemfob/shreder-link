import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from './../hooks/message.hook';

export const AuthPage = () => {
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(()=>{
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message)
    } catch (e) {}
  };
  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      message(data.message)
    } catch (e) {}
  };
  return (
    <div className="row">
      <div className="col s6 m6">
        <div className="card blue-grey darken-1">
          <h1>Cut the link</h1>
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="email"
                  type="text"
                  className="validate"
                  name="email"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s6">
                <input
                  id="password"
                  type="password"
                  className="validate"
                  name="password"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              onClick={loginHandler}
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
            >
              Sign in
            </button>
            <button
              onClick={registerHandler}
              className="btn grey lighten-1 black-text"
              disabled={loading}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
