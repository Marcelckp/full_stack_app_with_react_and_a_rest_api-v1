'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Course extends Model {};
    Course.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "The value for title cannot be null"
                },
                notEmpty: {
                    msg: "Please provide a value for the title it cannot be empty"

                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "The value for description cannot be null"
                },
                notEmpty: {
                    msg: "Please provide a value for the description it cannot be empty"

                }
            }
        },
        estimatedTime: {
            type: DataTypes.STRING,
        },
        materialsNeeded: {
            type: DataTypes.STRING,
        }
    }, { sequelize });
    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            as: 'user',
            foreignKey: {
                fieldName: "userId",
                allowNull: false,
            }
        })
    }

    return Course;
}