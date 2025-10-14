const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Job = sequelize.define("Job", {
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
  isTuru: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  olculerJson: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: "Detaylı ölçü bilgileri (array of objects)",
  },
  isDurumu: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "ödeme bekleniyor",
  },
  ozelNot: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: "Jobs",
  timestamps: true,
});

module.exports = Job;

