import { sendEmail } from "./utils/sendEmail";

export const testEmailRoute = {
  path: "/api/test-email",
  method: "post",
  handler: async (req, res) => {
    console.log("masuk");
    try {
      await sendEmail({
        to: "hello@ceghap.com",
        from: "n8y99zlby@mozmail.com",
        subject: "Test email",
        text: "This is a test email",
        html: "<h1>This is a test email</h1>",
      });

      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
};
