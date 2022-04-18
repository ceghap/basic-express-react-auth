import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useToken } from "../auth/useToken";
import axios from "axios";

export function SignupPage() {
  const [, setToken] = useToken();

  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const history = useHistory();
  const onSignup = async () => {
    const response = await axios.post("/api/signup", {
      email,
      password,
    });

    const { token } = response.data;

    setToken(token);

    history.push("/");
  };
  return (
    <div className="content-container">
      <h1>Sign up</h1>
      {error && <div className="fail">{error}</div>}
      <input
        placeholder="your@email.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        placeholder="password2"
        type="password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />

      <hr />
      <button
        disabled={!email || !password || password !== password2}
        onClick={onSignup}
      >
        Signup
      </button>

      <button onClick={() => history.push("/login")}>
        Already have an account? Login
      </button>
    </div>
  );
}
