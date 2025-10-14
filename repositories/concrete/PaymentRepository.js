const IPaymentRepository = require("../abstract/IPaymentRepository");
const { Payment, PaymentJob } = require("../../entities/associations");

class PaymentRepository extends IPaymentRepository {
  async create(payment) {
    return await Payment.create(payment);
  }

  async getAll() {
    return await Payment.findAll({
      include: [
        { association: "customer" },
        { association: "jobs" }
      ]
    });
  }

  async getById(id) {
    return await Payment.findByPk(id, {
      include: [
        { association: "customer" },
        { association: "jobs" }
      ]
    });
  }

  async getAllByMusteriId(musteriId) {
    return await Payment.findAll({
      where: { musteriId },
      include: [
        { association: "customer" },
        { association: "jobs" }
      ]
    });
  }

  async update(id, payment) {
    const existing = await Payment.findByPk(id);
    if (!existing) return null;
    await existing.update(payment);
    return existing;
  }

  async delete(id) {
    const deleted = await Payment.destroy({ where: { id } });
    return deleted > 0;
  }

  async linkPaymentToJob(odemeId, isId) {
    return await PaymentJob.create({ odemeId, isId });
  }
}

module.exports = PaymentRepository;

