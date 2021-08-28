const { DataTypes } = require("sequelize");
const database = require("../config/dbConfig");

const Check = database.define("Check", {
  id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(),
    allowNull: false,
  },

  url: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  protocol: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING(),
    allowNull: true,
  },

  // webhook url
  webhook: {
    type: DataTypes.STRING(),
    allowNull: false,
  },

  timeout: {
    type: DataTypes.INTEGER(),
    allowNull: false,
    defaultValue: 5000 /** in ms */,
  },

  interval: {
    type: DataTypes.BIGINT(),
    allowNull: false,
    defaultValue: 1000 * 60 * 10 /** 10 mins */,
  },

  username: {
    type: DataTypes.STRING(),
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING(),
    allowNull: false,
  },

  tag: {
    type: DataTypes.TEXT(),
    allowNull: false,
  },

  tableName: "checks",
});

module.exports = {
  Check,
};
