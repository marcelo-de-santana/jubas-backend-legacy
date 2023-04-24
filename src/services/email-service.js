const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

const mailOptions = {
  from: 'your-email@gmail.com',
  to: 'user-email@gmail.com',
  subject: 'Password Recovery',
  html: '<p>Click the link below to reset your password:</p>' +
        '<a href="http://localhost:3000/reset?token=your-unique-token">Reset Password</a>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
