import React, { useState } from "react";
import { useHttp } from "../hooks/http.hook";

export const AuthPage = () => {
  const { loading, error, request } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      console.log(data, "data");
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
