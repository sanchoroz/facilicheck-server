import config from 'config';
import jwt from 'jsonwebtoken';
import tokenModel from '../models/token-model.js';

class TokenService {
  async generateToken(payload) {
    const accessToken = jwt.sign(payload, config.get('jwtAccessTokenSekretKey'), {
      expiresIn: '1d',
    });
    const refreshToken = jwt.sign(payload, config.get('jwtRefreshTokenSekretKey'), {
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = new tokenModel({
      user: userId,
      refreshToken,
    });
    await token.save();

    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, config.get('jwtAccessTokenSekretKey'));
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, config.get('jwtRefreshTokenSekretKey'));
      return userData;
    } catch (error) {
      return null;
    }
  }

  async findToken(token) {
    try {
      const tokenData = await tokenModel.findOne({ token });
      return tokenData;
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
