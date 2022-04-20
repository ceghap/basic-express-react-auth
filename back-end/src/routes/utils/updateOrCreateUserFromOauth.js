import "dotenv/config";
import { getDbConnection } from "../../db";

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
  const db = await getDbConnection(process.env.DB_NAME);

  const { id: googleId, verified_email: verified, email } = oauthUserInfo;

  const user = await db.collection("users").findOne({ email });

  if (user) {
    const result = await db.collection("users").findOneAndUpdate(
      {
        email,
      },
      {
        $set: { googleId, verified },
      },
      { returnOriginal: false }
    );

    return result.value;
  } else {
    const result = await db.collection("users").insertOne({
      email,
      googleId,
      verified,
      info: {},
    });

    return result.ops[0];
  }
};
