import User from '../models/user-model.js';
import Role from '../models/role-model.js';
import tokenService from '../service/token-service.js';
import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import UserDto from '../dtos/user-dto.js';
import ApiErrors from '../exceptions/api-errors.js';
import mailService from './mail-service.js';

class UserService {
  async createUser(name, email, password, role) {
    const candidate = await User.findOne({ email });

    if (candidate) {
      throw ApiErrors.BadRequest(`user with this email: ${email} already exists`);
    }

    const hashPassword = await bcryptjs.hash(password, 5);

    const userRole = await Role.findOne({ value: role });

    const user = new User({
      name,
      email,
      password: hashPassword,
      roles: [userRole.value],
    });
    await user.save();

    const userDto = new UserDto(user);
    const tokens = await tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw ApiErrors.BadRequest(`user ${email} is not exists`);
    }

    const isAuth = bcryptjs.compareSync(password, user.password);

    if (!isAuth) {
      throw ApiErrors.BadRequest(`password doesn't match`);
    }

    const userDto = new UserDto(user);

    const tokens = await tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async me(userId) {
    const user = await User.findOne({ userId });
    return user;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiErrors.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiErrors.UnauthorizedError();
    }

    const user = await User.findOne({ id: userData.id });

    const userDto = new UserDto(user);

    const tokens = await tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await User.find();
    return users;
  }

  async getAllRoles() {
    const roles = await Role.find();
    return roles;
  }
}

export default new UserService();
