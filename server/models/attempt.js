const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Text = require('./text');

const Attempt = sequelize.define('Attempt', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  speed: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  accuracy: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  textId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Text,
      key: 'id'
    }
  }
}, {
  tableName: 'attempt',
  timestamps: false
});

Attempt.belongsTo(User, { foreignKey: 'userId' });
Attempt.belongsTo(Text, { foreignKey: 'textId' });

module.exports = Attempt;
