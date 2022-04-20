import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const history = useHistory();

  return (
    <div className="content-container">
      <h1>Success!</h1>
      <p>
        Your password hase been reset, now please login with your new password.
      </p>
      <button onClick={() => history.push("/login")}>Login</button>
    </div>
  );
};

const Failed = () => {
  const history = useHistory();

  return (
    <div className="content-container">
      <h1>Failed!</h1>
      <p>Somehing went wrong while trying to reset your password.</p>
      <button onClick={() => history.push("/login")}>Back to login</button>
    </div>
  );
};

export function PasswordResetPage() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const { passwordResetCode } = useParams();

  const onReset = async () => {
    try {
      await axios.put(`/api/users/${passwordResetCode}/reset-password`, {
        newPassword: password,
      });
      setSuccess(true);
    } catch (error) {
      setFail(true);
    }
  };

  if (fail) return Failed();

  if (success) return Success();

  return (
    <div className="content-container">
      <h1>Reset Password</h1>
      <p>Please enter a new password</p>

      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <input
        type="password2"
        onChange={(e) => setPassword2(e.target.value)}
        placeholder="confirm password"
      />

      <button
        disabled={!password || !password2 || password !== password2}
        onClick={onReset}
      >
        Reset password
      </button>
    </div>
  );
}
