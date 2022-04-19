import { ObjectID } from "mongodb";
import { getDbConnection } from "../db";
import jwt from "jsonwebtoken";

export const verifyEmailRoute = {
  path: "/api/verify-email",
  method: "put",
  handler: async (req, res) => {
    const { verificationString } = req.body;

    const db = getDbConnection(process.env.DB_NAME);

    const user = await db.collection("users").findOne({
      verificationString,
    });

    if (!user)
      return res
        .status(401)
        .json({ message: "verification code is incorrect" });

    const { _id: id, email, info } = user;

    await db.collection("users").updateOne(
      {
        _id: ObjectID(id),
      },
      {
        $set: { verified: true },
      }
    );

    jwt.sign(
      { id, email, info, verified: true },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) return res.sendStatus(500);

        res.status(200).json({ token });
      }
    );
  },
};
