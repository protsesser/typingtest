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
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  text_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: Text,
      key: 'id'
    }
  }
}, {
  tableName: 'attempt',
  timestamps: false
});

Attempt.belongsTo(User, { foreignKey: 'user_id' });
Attempt.belongsTo(Text, { foreignKey: 'user_id' });

module.exports = Attempt;
