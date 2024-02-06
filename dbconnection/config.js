const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sqlconnector = new Sequelize('databaseprom', 'user1', 'D4iS4stre13!', {
  host: '192.168.100.61',
  dialect: 'mysql',/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  define: {
    timestamps: false
  },
});

module.exports = {
    sqlconnector
}
