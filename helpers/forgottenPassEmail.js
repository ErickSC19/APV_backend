import nodemailer from "nodemailer";

const forgottenPassEmail = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, name, token } = data;

  //Send email
  const info = await transport.sendMail({
    from: "APV - Veterinary Administrator",
    to: email,
    subject: "Retrieve your password",
    text: "Retrieve your password at APV",
    html: `<h3 style="font-family: sans-serif;">Hi <span style="color: rgb(79, 70, 229);">${name}!</span>, now you can retrieve your password for APV.</h3>
        <p style="font-family: sans-serif;"> Click <a href="${process.env.FRONTEND_URL}/change-password/${token}">here</a> to change password and regain access.
            <br /> <br />
            If you do not recognize this, you can ignore this email.
        </p>
        `,
  });

  console.log("Message sent: %s", info.messageId);
};

export default forgottenPassEmail;
