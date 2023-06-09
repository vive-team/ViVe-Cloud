const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationError');
const InvariantError = require('../../exceptions/InvariantError');

class UsersService {
  async verifyAvailableEmail(email) {
    const retrievedUser = await User.findOne({ where: { email } });

    if (retrievedUser) {
      throw new InvariantError('cannot create user. email has been used');
    }
  }

  async addUser(newUser) {
    const { name, email, password } = newUser;
    const hashedPassword = await bcrypt.hash(password, 10);
    const addedUser = await User.create({ name, email, password: hashedPassword });

    return {
      id: addedUser.id,
      name: addedUser.name,
      email: addedUser.email,
      createdAt: addedUser.createdAt,
    };
  }

  async getUser(id) {
    const retrievedUser = await User.findOne({
      where: { id },
      attributes: [
        'id', 'name', 'username', 'email', 'phoneNumber', 'address', 'gender', 'photo',
      ],
    });

    if (!retrievedUser) {
      throw new NotFoundError(`user with id ${id} not found`);
    }

    return retrievedUser;
  }

  async verifyUserCredential(email, password) {
    const retrievedUser = await User.findOne({
      where: { email },
      attributes: ['id', 'password'],
    });

    if (!retrievedUser) {
      throw new AuthenticationError('credential you entered are wrong');
    }

    const isMatch = await bcrypt.compare(password, retrievedUser.password);

    if (!isMatch) {
      throw new AuthenticationError('credential you entered are wrong');
    }

    return retrievedUser.id;
  }
}

module.exports = UsersService;
