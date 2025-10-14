const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const PaymentType = require("../enums/paymentType");

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  musteriId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Customers",
      key: "id",
    },
  },
  odemeTuru: {
    type: DataTypes.ENUM(Object.values(PaymentType)),
    allowNull: false,
  },
  tutar: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false,
  },
  odemeTarihi: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  not: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  odemeAlanKullanici: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kalanTutar: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: true,
    defaultValue: 0,
  },
}, {
  tableName: "Payments",
  timestamps: true,
});

module.exports = Payment;

