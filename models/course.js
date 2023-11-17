'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Admin, {foreignKey: 'adminId'})
    }
  }
  Course.init({
    title: {
      type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'title is required!!!!!!!'
      }
    }},
    description: {
      type: DataTypes.TEXT,
    validate: {
      notEmpty: {
        msg: 'description is required!!!!!!!'
      }
    }},
    category: {
      type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'category is required!!!!!!!'
      }
    }},
    adminId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};