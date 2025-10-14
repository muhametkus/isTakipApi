const IJobService = require("../abstract/IJobService");
const JobRepository = require("../../repositories/concrete/JobRepository");

class JobService extends IJobService {
  constructor() {
    super();
    this.jobRepository = new JobRepository();
  }

  async create(jobDto) {
    return await this.jobRepository.create(jobDto);
  }

  async getAll() {
    return await this.jobRepository.getAll();
  }

  async getById(id) {
    return await this.jobRepository.getById(id);
  }

  async getAllByMusteriId(musteriId) {
    return await this.jobRepository.getAllByMusteriId(musteriId);
  }

  async update(id, jobDto) {
    return await this.jobRepository.update(id, jobDto);
  }

  async delete(id) {
    return await this.jobRepository.delete(id);
  }
}

module.exports = JobService;

