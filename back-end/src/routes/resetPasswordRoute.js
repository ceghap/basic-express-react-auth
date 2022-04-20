import "dotenv/config";
import bcrypt from "bcrypt";
import { getDbConnection } from "../db";

export const resetPasswordRoute = {
  path: "/api/users/:passwordResetCode/reset-password",
  method: "put",
  handler: async (req, res) => {
    const { passwordResetCode } = req.params;

    const { newPassword } = req.body;

    const db = await getDbConnection(process.env.DB_NAME);

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    const result = await db.collection("users").findOneAndUpdate(
      {
        passwordResetCode,
      },
      {
        $set: { passwordHash: newPasswordHash },
        $unset: { passwordResetCode: "" },
      }
    );

    if (result.lastErrorObject.n === 0) {
      return res.statusStatus(404);
    }

    res.sendStatus(200);
  },
};
