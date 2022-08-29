import nodemailer from 'nodemailer';

const forgottenPassEmail = async (data) => {
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
        subject: 'Retrive your password',
        text: 'Retrive your password at APV',
        html: `<p>Hi ${name}, now you can retrieve your password for APV.</p>
        <p> Click on next link to change password and regain access:
        <a href="${process.env.FRONTEND_URL}/change-password/${token}">-link-</a></p>

        <p>If you didn't created this, you can ignore this email</p>
        `
    });

    console.log("Message sent: %s", info.messageId);
};

export default forgottenPassEmail;