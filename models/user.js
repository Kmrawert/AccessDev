module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true
            }
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true
            }

        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return User;

};