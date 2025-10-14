const IUserService = require("../abstract/IUserService");
const UserRepository = require("../../repositories/concrete/UserRepository");

class UserService extends IUserService {
  constructor() {
    super();
    this.userRepository = new UserRepository();
  }

  async create(userDto) {
    return await this.userRepository.create(userDto);
  }

  async getAll() {
    return await this.userRepository.getAll();
  }

  async getById(id) {
    return await this.userRepository.getById(id);
  }

  async update(id, userDto) {
    return await this.userRepository.update(id, userDto);
  }

  async delete(id) {
    return await this.userRepository.delete(id);
  }
}

module.exports = UserService;
