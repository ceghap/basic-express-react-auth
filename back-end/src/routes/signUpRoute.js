import "dotenv/config";
import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { sendEmail } from "./utils/sendEmail";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const db = await getDbConnection(process.env.DB_NAME);
    const user = await db.collection("users").findOne({ email });

    if (user) return res.status(400).json({ error: "User already exists" });

    const passwordHash = await bcrypt.hash(password, 10);

    const verificationString = uuid();

    const startingInfo = {
      hairColor: "",
      favoriteFood: "",
      bio: "",
    };

    const newUser = await db.collection("users").insertOne({
      email,
      passwordHash,
      info: startingInfo,
      verified: false,
      verificationString,
    });

    const { insertedId } = newUser;

    try {
      await sendEmail({
        to: email,
        from: process.env.SENDER_EMAIL,
        subject: "Please verify your email",
        text: `
          Thanks for signing up! To verify your email, click here:
          http://localhost:3000/verify-email/${verificationString}
        `,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }

    jwt.sign(
      { id: insertedId, email, info: startingInfo, verified: false },
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
