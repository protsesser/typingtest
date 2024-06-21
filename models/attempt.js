const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Text = require('./text');

const Attempt = sequelize.define('Attempt', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  textId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: Text,
      key: 'id'
    }
  },
  speed: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  accuracy: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  score: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'attempts',
  timestamps: false
});

Attempt.belongsTo(User, { foreignKey: 'userId' });
Attempt.belongsTo(Text, { foreignKey: 'textId' });

module.exports = Attempt;
