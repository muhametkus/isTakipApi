const ICustomerService = require("../abstract/ICustomerService");
const CustomerRepository = require("../../repositories/concrete/CustomerRepository");

class CustomerService extends ICustomerService {
  constructor() {
    super();
    this.customerRepository = new CustomerRepository();
  }

  async create(customerDto) {
    return await this.customerRepository.create(customerDto);
  }

  async getAll() {
    return await this.customerRepository.getAll();
  }

  async getById(id) {
    return await this.customerRepository.getById(id);
  }

  async update(id, customerDto) {
    return await this.customerRepository.update(id, customerDto);
  }

  async delete(id) {
    return await this.customerRepository.delete(id);
  }
}

module.exports = CustomerService;

