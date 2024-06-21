const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('typetest', 'postgres', 'postgres', {
  host: 'localhost',
	port: '5432',
  dialect: 'postgres'
});

module.exports = sequelize;
