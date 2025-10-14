const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Customer = sequelize.define("Customer", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  adSoyad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  adres: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  kayitTarihi: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "Customers",
  timestamps: true,
});

module.exports = Customer;
