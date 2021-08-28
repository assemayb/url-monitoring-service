const { DataTypes } = require("sequelize");
const database = require("../config/dbConfig")


const Check = database.define(
  "Check",
  {
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
  

    tableName: "checks",
  }
);

module.exports = {
  Check,
};
