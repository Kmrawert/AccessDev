module.exports = function(sequelize, DataTypes) {
    var Event = sequelize.define("Event", {
      // Giving the Event model a name of type STRING
      Status: DataTypes.STRING, 
        open: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1,
            len: [1]
        }

    });
  
    Event.associate = function(models) {
        // Associating Event with Event
        // When an Event is deleted, also delete any associated Event
        Event.belongsTo(models.User, {
            foreignKey: 'UserId'
          });
        Event.belongsTo(models.Gigs, {
            foreignKey: 'GigsId'
          });
      };
  
    return Event;
  };
  