module.exports = function(sequelize, DataTypes) {
    var Gigs = sequelize.define("Gigs", {
      // Giving the Gigs model a name of type STRING
      title: DataTypes.STRING,
      instrument: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull: true
             }     
        },   
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull: true
             }
            
        },   
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate:{
                notNull: true
            }        
        },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull: true
             }
            
        },   
        money: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0,
            len: [1]
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            len: [0,250]
          },

          

    });
  
    // Gigs.associate = function(models) {
    //     // Associating Gigs with Gigs
    //     // When an Gigs is deleted, also delete any associated Gigs
    //     Gigs.belongsTo(models.Talent, {
    //         foreignKey: {
    //           allowNull: false
    //         }
    //       });
    //   };
  
    return Gigs;
  };
  