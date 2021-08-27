const nodemailer = require("nodemailer");

const email = process.env.EMAIL;
const password = process.env.PASSWORD;


const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: email,
    pass: password,
  },
});

const sendConfirmationEmail  = (receiverMail, conformationCode) => {
  try {
    transport.sendMail({
      from: email,
      to: receiverMail,
      subject: "Please confirm your account",
      html: `
             <h1>Email Confirmation</h1>
            <h1>your confimation code is: ${conformationCode}</h1>
            </div>`,
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { sendConfirmationEmail  };
