const { DataTypes } = require("sequelize");
const database = require("../config/dbConfig");
const { Check } = require("./Check");

const Report = database.define(
  "Report",
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
    history: {},
  },
  {
    tableName: "reports",
  }
);

Report.belongsTo(Check, {
  as: "checkId",
});

module.exports = {
  Report,
};
