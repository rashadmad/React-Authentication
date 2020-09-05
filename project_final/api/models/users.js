'use strict';
const Sequelize = require('sequelize'); 

module.exports = (sequelize) => {
  class Users extends Sequelize.Model {}
  Users.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                // custom error message
                msg: 'Please provide a name for the user',
            }
        },
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                // custom error message
                msg: 'Please provide a last name for the user',
            }
        },
    },
    emailAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                // custom error message
                msg: 'Please add a valid email address',
            }
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                // custom error message
                msg: 'Please provide a password',
            }
        },
    },
  }, { sequelize });
  
    //Within your User model, define a HasMany association between your User and Course models (i.e. a "User" has many "Courses").
    Users.associate = (models) => {
        Users.hasMany(models.Courses, {
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            },
        });
    };

  return Users;
};