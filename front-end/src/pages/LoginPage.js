import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useToken } from "../auth/useToken";
import axios from "axios";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function LoginPage() {
  const [, setToken] = useToken();

  const query = useQuery();

  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleOauthUrl, setGoogleOauthUrl] = useState("");

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

  useEffect(() => {
    if (query.get("token")) {
      setToken(query.get("token"));
      history.push("/");
    }
  }, [query, history, setToken]);

  useEffect(() => {
    const getGoogleOauthUrl = async () => {
      try {
        const response = await axios.get("/auth/google/url");
        const { url } = response.data;
        setGoogleOauthUrl(url);
      } catch (error) {
        console.log(error);
      }
    };

    getGoogleOauthUrl();
  }, []);

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
      <button
        disabled={!googleOauthUrl}
        onClick={() => (window.location.href = googleOauthUrl)}
      >
        Login with Google
      </button>
    </div>
  );
}
