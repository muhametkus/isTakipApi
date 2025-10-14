const IUserRepository = require("../abstract/IUserRepository");
const User = require("../../entities/userEntity");

class UserRepository extends IUserRepository {
  async create(user) {
    return await User.create(user);
  }

  async getAll() {
    return await User.findAll();
  }

  async getById(id) {
    return await User.findByPk(id);
  }

  async update(id, user) {
    const existing = await User.findByPk(id);
    if (!existing) return null;
    await existing.update(user);
    return existing;
  }

  async delete(id) {
    const deleted = await User.destroy({ where: { id } });
    return deleted > 0;
  }
}

module.exports = UserRepository;
