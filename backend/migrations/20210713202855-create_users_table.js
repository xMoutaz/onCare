'use strict';

const {DataTypes} = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type:DataTypes.STRING,
        allowNull: false
    },
    password: {
        type:DataTypes.STRING,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return  queryInterface.dropTable("users");
  }
};
