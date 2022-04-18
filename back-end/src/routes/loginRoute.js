import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db";

export const loginRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const db = await getDbConnection(process.env.DB_NAME);
    const user = await db.collection("users").findOne({ email });

    if (!user) return res.sendStatus(401);

    const { _id: id, verified, passwordHash, info } = user;

    const validPassword = await bcrypt.compare(password, passwordHash);

    if (!validPassword) return res.sendStatus(401);

    jwt.sign(
      { id, email, info, verified },
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
