const bcrypt = require("bcrypt")
const crypto = require("crypto")

// let password  = "55555"
// let hashedPassword = bcrypt.hashSync(password, 10)


let secret = crypto.randomBytes(10).toString("hex")
console.log(secret);
