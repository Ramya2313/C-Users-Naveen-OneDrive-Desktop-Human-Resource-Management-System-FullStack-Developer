// backend/src/models/log.js

module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    organisation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'organisations', key: 'id' },
    },
    user_id: {
      type: DataTypes.INTEGER,
      // user_id can be null if action is system-level or pre-login (e.g., initial org creation)
      references: { model: 'users', key: 'id' },
    },
    action: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    meta: {
      type: DataTypes.JSONB, // Use JSONB for Postgres, or JSON for MySQL
      defaultValue: {},
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'logs',
  });

  return Log;
};