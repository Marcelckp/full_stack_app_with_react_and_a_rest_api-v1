'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {};
    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Please enter a value for first name."
                },
                notNull: {
                    msg: "The value for cannot firstName be null."
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Please enter a value for the last name."
                },
                notNull: {
                    msg: "The value for lastName cannot be null."
                }
            }
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'The email you entered is already in use.'
            },
            validate: {
                isEmail: {
                    msg: "The format you gave for emailAddress is incorrect fix it and send your request again."
                },
                notNull: {
                    msg: "The value for emailAddress cannot be null."
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Please enter a value for the password."
                },
                notNull: {
                    msg: "The value for password cannot be null."
                },
                // len: {
                //     args: [6, 20],
                //     msg: 'Your password must be at least 8 characters long and can\'t be more the 20'
                // }
            }
        }
    }, { sequelize });

    User.associate = (models) => {
        User.hasMany(models.Course, {
            as: 'user',
            foreignKey: {
                fieldName: "userId",
                allowNull: false,
            }
        })
    }

    return User;
}