const { DataTypes } = require("sequelize");
const database = require("../config/dbConfig")


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

    active: {
      type: DataTypes.BOOLEAN(),
      defaultValue: false,
      allowNull: false,
    },

    confirmationCode: {
      type: DataTypes.STRING(),
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
