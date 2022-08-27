const Sequelize = require("sequelize");
const dbConfig = require("./db.config");

const { dbName, username, password, host, dialect } = dbConfig;
const sequelize = new Sequelize(dbName, username, password, {
  host,
  dialect,
  query: {
    raw: true,
    logging: false,
  },

  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require("../model/users.model")(sequelize, Sequelize);
db.categories = require("../model/categories.model")(sequelize, Sequelize);

module.exports = db;