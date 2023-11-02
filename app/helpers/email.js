const nodemailer = require('nodemailer');
const mail = require('../../config/app')

module.exports = {
    async sendWelcomeEmail(user, randomPassword){
        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: mail.sendmail.from_email,
                pass: mail.sendmail.from_email_password
            }
        });

        const mailOptions = {
            from: mail.sendmail.from_email,
            to: user.email,
            subject: 'Bienvenue dans la communauté Wazapou!',
            html: `<p>Cher ${user.username},</p>
                    <p>Merci de rejoindre notre communauté !</p>
                    <p>Voici votre mot de passe pour vous connecter : <strong>${randomPassword}</strong></p>
                    <p>Cordialement,</p>
                    <p>L'équipe de Wazapou</p>`
        };

        // Send the email
        return  await transporter.sendMail(mailOptions);
    }
}