class IPaymentRepository {
  create(payment) {}
  getAll() {}
  getById(id) {}
  getAllByMusteriId(musteriId) {}
  update(id, payment) {}
  delete(id) {}
  linkPaymentToJob(odemeId, isId) {}
}

module.exports = IPaymentRepository;

