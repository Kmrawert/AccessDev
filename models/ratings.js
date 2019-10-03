module.exports = function(sequelize, DataTypes) {
    var Rating= sequelize.define("Rating", {
      // Giving the Talent model a name of type STRING
        number: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: null,
                validate:{min: 0, max: 5 }
            }

    });
  
    // Rating.associate = function(models) {
    //   // Associating Rating with Posts
    //   // When an Rating is deleted, also delete any associated Posts
    //   Rating.belongsTo(models.Talent, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };
  
    return Rating;
  };