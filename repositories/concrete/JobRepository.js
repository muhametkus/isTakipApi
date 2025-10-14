const IJobRepository = require("../abstract/IJobRepository");
const { Job } = require("../../entities/associations");

class JobRepository extends IJobRepository {
  async create(job) {
    return await Job.create(job);
  }

  async getAll() {
    return await Job.findAll({
      include: [
        { association: "customer" },
        { association: "payments" }
      ]
    });
  }

  async getById(id) {
    return await Job.findByPk(id, {
      include: [
        { association: "customer" },
        { association: "payments" }
      ]
    });
  }

  async getAllByMusteriId(musteriId) {
    return await Job.findAll({
      where: { musteriId },
      include: [
        { association: "customer" },
        { association: "payments" }
      ]
    });
  }

  async update(id, job) {
    const existing = await Job.findByPk(id);
    if (!existing) return null;
    await existing.update(job);
    return existing;
  }

  async delete(id) {
    const deleted = await Job.destroy({ where: { id } });
    return deleted > 0;
  }
}

module.exports = JobRepository;

