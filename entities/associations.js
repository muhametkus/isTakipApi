const Customer = require("./customerEntity");
const Job = require("./jobEntity");
const Payment = require("./paymentEntity");
const PaymentJob = require("./paymentJobEntity");

// Customer <-> Job (one-to-many)
Customer.hasMany(Job, {
  foreignKey: "musteriId",
  as: "jobs",
});
Job.belongsTo(Customer, {
  foreignKey: "musteriId",
  as: "customer",
});

// Customer <-> Payment (one-to-many)
Customer.hasMany(Payment, {
  foreignKey: "musteriId",
  as: "payments",
});
Payment.belongsTo(Customer, {
  foreignKey: "musteriId",
  as: "customer",
});

// Job <-> Payment (many-to-many through PaymentJob)
Job.belongsToMany(Payment, {
  through: PaymentJob,
  foreignKey: "isId",
  otherKey: "odemeId",
  as: "payments",
});
Payment.belongsToMany(Job, {
  through: PaymentJob,
  foreignKey: "odemeId",
  otherKey: "isId",
  as: "jobs",
});

module.exports = { Customer, Job, Payment, PaymentJob };

