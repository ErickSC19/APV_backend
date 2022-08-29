import nodemailer from 'nodemailer';

const registerEmail = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { email, name, token } = data;

    //Send email
    const info = await transport.sendMail({
        from: 'APV - Veterinary Administrator',
        to: email,
        subject: 'Confirm your account',
        text: 'Confirm your account at APV',
        html: `<p>Hi ${name}, confirm your account for APV.</p>
        <p> Your account is ready, only confirmation needed, click:
        <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirm</a></p>

        <p>If you didn't created this, you can ignore this email</p>
        `
    });

    console.log("Message sent: %s", info.messageId);
};

export default registerEmail;