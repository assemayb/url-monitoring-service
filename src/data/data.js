// mock data

const dummieUsers = [
  {
    username: "assem",
    email: "assem@gmail.com",
    // password: "12345",
    hashedPassword:
      "$2b$10$Vn4CYIWNAezfJBBpP.BrKufqqMTYYr/Hpkcm6q/vUbrzbZ6UIMfou",

    // for email verification process this attribute is set to false by default
    // until the email is verified
    active: false,
  },
  {
    username: "ahmed",
    email: "ahmed@gmail.com",
    // password: "55555",
    hashedPassword:
      "$2b$10$YRuGbacJd/56aQaIqt.KG.ukb4LSNQWpTRPwi6FEVyZFmXr4NJa.G",
    active: false,
  },
];


const checks = [
  {
    id: 1,
    url: "https://www.assemsaad.tech",
    protocol: "https",
    name: "site-check",
    webhook: "dasdasd",
  },
  {
    id: 2,
    url: "https://www.assemsaad.tech",
    protocol: "https",
    name: "site-check",
    webhook: "dasdasd",
  },
  {
    id: 3,
    url: "https://www.assemsaad.tech",
    protocol: "https",
    name: "site-check",
    webhook: "dasdasd",
  },
];

module.exports = checks