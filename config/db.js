const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "postgres123", {
  host: "89.252.153.218",
  port: 15432,
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
