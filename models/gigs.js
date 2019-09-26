module.exports = function(sequelize, DataTypes) {
    var gigs = sequelize.define("gigs", {
      // Giving the gigs model a name of type STRING
      title: DataTypes.STRING,
      instrument: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull: true,
            msg: 'Please enter your Instrument(s)'
             }
            
        },   
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull: true,
            msg: 'Please enter your genre'
             }
            
        },   
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate:{
                notNull: true,
                msg: 'Please enter a date'
            }        
        },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull: true,
            msg: 'Please enter your Location'
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
  
    gigs.associate = function(models) {
        // Associating gigs with Posts
        // When an gigs is deleted, also delete any associated Posts
        gigs.belongsTo(models.Talent, {
            foreignKey: {
              allowNull: false
            }
          });
      };
  
    return gigs;
  };
  