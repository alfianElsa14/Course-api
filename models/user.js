'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'username is required!!!!!!!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        arg: true,
        msg: "Email already taken"
      },
    validate: {
      notEmpty: {
        msg: 'email is required!!!!!!!'
      }      
    }},
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'password is required!!!!!!!'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hash(user.password)
    user.role = 'user'
  })
  return User;
};