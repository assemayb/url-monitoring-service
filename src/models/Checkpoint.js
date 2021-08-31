const { DataTypes } = require("sequelize");
const database = require("../config/dbConfig");
const { Check } = require("./Check");

const CheckPoint = database.define(
  "CheckPoint",
  {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },

    // available or not
    currentStatus: {
      type: DataTypes.STRING(), 
      allowNull: false,
    },
    responseTime: {
      type: DataTypes.FLOAT(),
      allowNull: false,
    },
    // down and up times are in seconds
    uptime: {
      type: DataTypes.INTEGER(),
      allowNull: true,
    },

    downtime: {
      type: DataTypes.INTEGER(),
      allowNull: true,
    },

    responseTime: {
      type: DataTypes.FLOAT(),
      allowNull: false,
    },
  },
  {
    tableName: "checkpoints",
  }
);

// each check has many checkpoints
CheckPoint.belongsTo(Check, {
  as: "check",
});

module.exports = {
  CheckPoint,
};
