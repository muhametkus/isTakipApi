const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("userdb", "postgres", "postgres123", {
  host: "localhost",   // Docker container localhost port 5432'ye bağlı
  dialect: "postgres",
  logging: false,      // Konsolda SQL loglarını kapatmak için
});

module.exports = sequelize;
