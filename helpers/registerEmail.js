import nodemailer from "nodemailer";

const registerEmail = async (data) => {
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
    subject: "Confirm your account",
    text: "Confirm your APV account",
    html: `<h3 style="font-family: sans-serif;">Hi <span style="color: rgb(79, 70, 229);">${name}!</span>, confirm your account for APV.</h3>
        <p style="font-family: sans-serif;"> Your account is ready, confirm it and start the management of your consultations, click:
            <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirm</a>
            <br /> <br />
            If you didn't created this, you can ignore this email.
        </p>
        `,
  });

  console.log("Message sent: %s", info.messageId);
};

export default registerEmail;
