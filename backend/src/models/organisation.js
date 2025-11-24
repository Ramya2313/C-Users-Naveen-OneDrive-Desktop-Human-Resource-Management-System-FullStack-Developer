// backend/src/models/organisation.js

module.exports = (sequelize, DataTypes) => {
  const Organisation = sequelize.define('Organisation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'organisations',
  });

  // Associations are handled in src/db.js, but can also be defined here
  Organisation.associate = function(models) {
    // Organisation.hasMany(models.User, { foreignKey: 'organisation_id' });
  };

  return Organisation;
};