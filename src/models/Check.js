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

  username: {
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
