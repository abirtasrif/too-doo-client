"use client";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, loading } = useSignup();

  const handleSignUp = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <form className="signup-form" onSubmit={handleSignUp}>
      <h2 className="signup">Sign Up</h2>

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
        Sign Up
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Signup;
