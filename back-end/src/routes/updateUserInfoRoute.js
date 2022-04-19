import "dotenv/config";
import jwt from "jsonwebtoken";
import { ObjectID } from "mongodb";
import { getDbConnection } from "../db";

export const updateUserInfoRoute = {
  path: "/api/users/:userId",
  method: "put",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { userId } = req.params;

    const updates = (({ favoriteFood, hairColor, bio }) => ({
      favoriteFood,
      hairColor,
      bio,
    }))(req.body);

    if (!authorization) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const token = authorization.split(" ")[1];

    const { id, verified } = await jwt.verify(token, process.env.JWT_SECRET);

    if (id !== userId) return res.status(403).json({ message: "Forbidden" });
    if (!verified)
      return res.status(403).json({
        message: "Please verify your email before you can update your data",
      });

    const db = await getDbConnection(process.env.DB_NAME);
    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { _id: ObjectID(id) },
        { $set: { info: updates } },
        { returnOriginal: false }
      );

    const { email, info } = result.value;

    jwt.sign(
      { id, email, verified, info },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ token });
      }
    );
  },
};
