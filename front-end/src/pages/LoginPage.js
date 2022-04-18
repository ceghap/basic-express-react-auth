import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useToken } from "../auth/useToken";
import axios from "axios";

export function LoginPage() {
  const [, setToken] = useToken();

  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const onLogin = async () => {
    const response = await axios.post("/api/login", {
      email,
      password,
    });

    const { token } = response.data;

    setToken(token);

    history.push("/");
  };
  return (
    <div className="content-container">
      <h1>Login</h1>
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

      <hr />
      <button disabled={!email || !password} onClick={onLogin}>
        Login
      </button>
      <button onClick={() => history.push("/forgot-password")}>
        Forgot your password?
      </button>
      <button onClick={() => history.push("/signup")}>
        Don't have an account? Sign up
      </button>
    </div>
  );
}
