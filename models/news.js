'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class news extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  news.init(
    {
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
      image: DataTypes.STRING,
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
      // deleted_at: DataTypes.STRING,
      is_active: DataTypes.STRING,
    },
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      sequelize,
      modelName: "news",
    }
  );
  return news;
};