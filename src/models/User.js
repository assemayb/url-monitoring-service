const { DataTypes } = require("sequelize");
const database = require("../database/dbConfig");

const User = database.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(),
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING(),
      allowNull: false,
    },

    // for the email verification
    active: {
      type: DataTypes.TEXT(),
      allowNull: false,
      default: false,
    },

    confirmationCode: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
  },
  {
    tableName: "Users",
  }
);

module.exports = {
  User,
};
