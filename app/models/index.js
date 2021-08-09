const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
     define: {
    timestamps: false,
    freezeTableName: true
  },
  logging: false
  },

);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.payment = require("../models/payment.model.js")(sequelize, Sequelize);

module.exports = db;