const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Text = sequelize.define('Text', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
	source: {
		type: DataTypes.STRING(50),
    allowNull: true
	},
	author: {
		type: DataTypes.STRING(50),
    allowNull: true
	}
}, {
  tableName: 'text',
  timestamps: false
});

module.exports = Text;
