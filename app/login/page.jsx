"use client";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, loading } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2 className="login">Login</h2>

      <div className="form-control">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          placeholder="hello@mynote.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button disabled={loading} type="submit">
        Log In
      </button>

      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
