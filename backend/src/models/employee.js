// backend/src/models/employee.js

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
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
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      validate: { isEmail: true }
    },
    phone: {
      type: DataTypes.STRING(50),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'employees',
  });

  return Employee;
};