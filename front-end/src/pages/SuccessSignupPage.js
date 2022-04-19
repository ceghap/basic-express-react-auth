import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export function SuccessSignupPage() {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 3000);
  }, [history]);

  return (
    <div className="content-container">
      <h1>Thanks for signing Up!</h1>
      <p>
        a verification email has been send to the email address you provided.
        Please verify your email to unlock full site feature.
      </p>
    </div>
  );
}
