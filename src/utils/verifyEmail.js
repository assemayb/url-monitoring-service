const nodemailer = require("nodemailer");


// user credentials from the .env file
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


const sendAvialabilityCheck  = (checkData) => {
  const {name , username, url, isFine } = checkData
  
  const status = isFine == true ? "up" : "down"
  
  try {
    transport.sendMail({
      from: email,
      to: username,
      subject: "site check",
      html: `the url ${url} is currently ${status} </div>`,
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { sendConfirmationEmail, sendAvialabilityCheck  };
