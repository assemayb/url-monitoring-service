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
    currentStatus: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    responseTime: {
      type: DataTypes.FLOAT(),
      allowNull: false,
    },
    availability: {
      type: DataTypes.FLOAT(),
      allowNull: false,
    },
    // down and up times are in seconds
    uptime: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },

    downtime: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },

    // avg response time
    responseTime: {
      type: DataTypes.FLOAT(),
      allowNull: false,
    },
  },
  {
    tableName: "checkpoints",
  }
);

CheckPoint.belongsTo(Check, {
  as: "checkId",
});

module.exports = {
  Report,
};
