import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useHistory } from "react-router-dom";

const Success = () => {
  const history = useHistory();

  return (
    <div className="content-container">
      <h1>Success!</h1>
      <p>
        Thanks for verifying your email,now you can use all the app's features.
      </p>
      <button onClick={() => history.push("/")}>Go to home page</button>
    </div>
  );
};

const Failed = () => {
  const history = useHistory();

  return (
    <div className="content-container">
      <h1>Failed!</h1>
      <p>Something went wrong while trying to verify your email.</p>
      <button onClick={() => history.push("/signup")}>
        Back to signup page
      </button>
    </div>
  );
};

export function EmailVerificationPage() {
  const [isLoading, setIsLoading] = useState(true);

  const [isSuccess, setIsSuccess] = useState(false);

  const { verificationString } = useParams();

  const [, setToken] = useToken();

  useEffect(() => {
    const loadVerification = async () => {
      try {
        const response = await axios.put(`/api/verify-email`, {
          verificationString,
        });

        console.log(response);

        const { token } = response.data;
        setToken(token);
        setIsLoading(false);
        setIsSuccess(true);
      } catch (error) {
        setIsLoading(false);
        setIsSuccess(false);
      }
    };

    loadVerification();
  }, [setToken, verificationString]);

  return (
    <>
      {isLoading && (
        <>
          <p>loading...</p>
        </>
      )}
      {!isSuccess && Failed()}

      {!isLoading && isSuccess && Success()}
    </>
  );
}
