module.exports = function(sequelize, DataTypes) {
    var Talent = sequelize.define("Talent", {
      // Giving the Talent model a name of type STRING
      name: DataTypes.STRING,
      instrument: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull: true
             }
            
        },  
        image: DataTypes.STRING,
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull: true
             }
            
        },   
        rating: DataTypes.DECIMAL(10,2),
        numberofGigs: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            len: [1]
        },
        moneyEarned: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0,
            len: [1]
        },
        bio: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null,
          len: [0,250]
        },    
        YouTubeLinks: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null,
          len: [0,500]
        }
    });
  
    // Talent.associate = function(models) {
    //     // Associating Talent with Posts
    //     // When an Talent is deleted, also delete any associated Posts
    //     Talent.hasMany(models.Rating, {
    //       onDelete: "cascade"
    //     });
    //   };
  
    return Talent;
  };
  