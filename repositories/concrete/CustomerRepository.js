const ICustomerRepository = require("../abstract/ICustomerRepository");
const { Customer } = require("../../entities/associations");

class CustomerRepository extends ICustomerRepository {
  async create(customer) {
    return await Customer.create(customer);
  }

  async getAll() {
    return await Customer.findAll({
      include: [
        { association: "jobs" },
        { association: "payments" }
      ]
    });
  }

  async getById(id) {
    return await Customer.findByPk(id, {
      include: [
        { association: "jobs" },
        { association: "payments" }
      ]
    });
  }

  async update(id, customer) {
    const existing = await Customer.findByPk(id);
    if (!existing) return null;
    await existing.update(customer);
    return existing;
  }

  async delete(id) {
    const deleted = await Customer.destroy({ where: { id } });
    return deleted > 0;
  }
}

module.exports = CustomerRepository;

