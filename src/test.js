const bcrypt = require("bcrypt")


let password  = "55555"
let hashedPassword = bcrypt.hashSync(password, 10)

console.log(hashedPassword);