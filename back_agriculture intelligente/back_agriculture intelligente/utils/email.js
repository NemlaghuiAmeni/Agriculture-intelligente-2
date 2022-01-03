const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'raniaslama28@gmail.com',
      pass: 'azertyuiop123A*'
    }
  });

  /*let mailOptions = {
  from: user.email, // sender address
  to: 'othmeneb@gmail.com', //
*/
  // 2) Define the email options    //MAIL TRAP
  const mailOptions = {
    from: 'Rania Slama <raniaslama28@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
