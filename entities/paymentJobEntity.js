const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PaymentJob = sequelize.define("PaymentJob", {
  odemeId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Payments",
      key: "id",
    },
  },
  isId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Jobs",
      key: "id",
    },
  },
}, {
  tableName: "PaymentJobs",
  timestamps: false,
});

module.exports = PaymentJob;

