import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const onClick = async () => {
    try {
      await axios.put(`/api/forgot-password/${email}`, {});
      setSuccess(true);
      setTimeout(() => {
        history.push("/login");
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {success ? (
        <div className="content-container">
          <h1>Success</h1>
          <p>Check your email for a reset link</p>
        </div>
      ) : (
        <div className="content-container">
          <h1>Forgot Password</h1>
          <p>Enter your email and we'll send you a reset link</p>
          {error && <div className="fail">{error}</div>}

          <input
            name="email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="someone@domain.com"
          />

          <button disabled={!email} onClick={onClick}>
            Send reset link
          </button>
        </div>
      )}
    </>
  );
}
