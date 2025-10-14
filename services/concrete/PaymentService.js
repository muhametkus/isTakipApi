const IPaymentService = require("../abstract/IPaymentService");
const PaymentRepository = require("../../repositories/concrete/PaymentRepository");

class PaymentService extends IPaymentService {
  constructor() {
    super();
    this.paymentRepository = new PaymentRepository();
  }

  async create(paymentDto) {
    return await this.paymentRepository.create(paymentDto);
  }

  async getAll() {
    return await this.paymentRepository.getAll();
  }

  async getById(id) {
    return await this.paymentRepository.getById(id);
  }

  async getAllByMusteriId(musteriId) {
    return await this.paymentRepository.getAllByMusteriId(musteriId);
  }

  async update(id, paymentDto) {
    return await this.paymentRepository.update(id, paymentDto);
  }

  async delete(id) {
    return await this.paymentRepository.delete(id);
  }

  async linkPaymentToJob(odemeId, isId) {
    return await this.paymentRepository.linkPaymentToJob(odemeId, isId);
  }
}

module.exports = PaymentService;

