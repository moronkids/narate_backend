'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init(
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("password", bcrypt.hashSync(value, 10));
        },
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "users",
    }
  );
  return users;
};