import { useState, useEffect } from "react";

import { useToken } from "./useToken";

export function useUser() {
  const [token] = useToken();

  const getPayloadFromToken = (token) => {
    if (!token) return null;
    const encodedPayload = token.split(".")[1];
    const payload = JSON.parse(atob(encodedPayload));
    return payload;
  };

  const [user, setUser] = useState(() => {
    if (!token) return null;

    if (token) {
      return getPayloadFromToken(token);
    }
  });

  useEffect(() => {
    if (!token) {
      setUser(undefined);
    } else {
      setUser(getPayloadFromToken(token));
    }
  }, [token]);

  return user;
}
