const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Text = sequelize.define('Text', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false
  },
	author: {
		type: DataTypes.STRING,
    allowNull: false
	},
	content: {
		type: DataTypes.STRING,
    allowNull: true
	}
}, {
  tableName: 'texts',
  timestamps: false
});

module.exports = Text;
