// backend/src/models/employeeTeam.js

module.exports = (sequelize, DataTypes) => {
  const EmployeeTeam = sequelize.define('EmployeeTeam', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'employees', key: 'id' },
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'teams', key: 'id' },
    },
    assigned_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    // Ensure that an employee can only be assigned to a team once
    indexes: [{ unique: true, fields: ['employee_id', 'team_id'] }],
    tableName: 'employee_teams',
  });

  return EmployeeTeam;
};