'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Courses extends Sequelize.Model {}
  Courses.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                // custom error message
                msg: 'Please provide a title for the course',
            }
         },
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                // custom error message
                msg: 'Please provide a description of the course',
            }
         },
    },
    estimatedTime: {
        type: Sequelize.STRING, 
        allowNull: true,
    },
    materialsNeeded: {
        type: Sequelize.STRING,
        allowNull: true,
    },
  }, { sequelize });

      //Within your Course model, define a BelongsTo association between your Course and User models (i.e. a "Course" belongs to a single "User").
      Courses.associate = (models) => {
        Courses.belongsTo(models.Users, {
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            },
        });
    };

  return Courses;
};