import axios from "axios";
import { oauthClient } from "./oauthClient";

const getAccessAndBearerTokenUrl = ({ access_token }) =>
  `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;

export const getGoogleUser = async ({ code }) => {
  const { tokens } = await oauthClient.getToken(code);
  const response = await axios.get(
    getAccessAndBearerTokenUrl(
      { access_token: tokens.access_token },
      { headers: { Authorization: `Bearer ${tokens.id_token}` } }
    )
  );

  return response.data;
};
