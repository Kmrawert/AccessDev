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
        },
        instrument: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: DataTypes.STRING,
          location: {
            type: DataTypes.STRING,
            allowNull: true,        
            },   
            rating: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: false,
                defaultValue: 5.0,
            },
            numberofGigs: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                len: [1]
            },
            moneyEarned: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0,
                len: [1]
            },
            bio: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null,
                len: [0, 250]
            },
            YouTubeLinks: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null,
                len: [0, 500]
            },
    
    });
    // User.associate = function(models) {
    //     // Associating User with Posts
    //     // When an User is deleted, also delete any associated Posts
    //     User.belongsTo(models.Talent, {
    //       foreignKey: {
    //         allowNull: false
    //       }
    //     });
    //   };
    

    return User;

};