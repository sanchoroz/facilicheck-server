import ApiErrors from '../exceptions/api-errors.js';
import tokenService from '../service/token-service.js';

export const auth = (req, res, next) => {
  try {
    if (req.method == -'OPTIONS') {
      next();
    }
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(ApiErrors.UnauthorizedError());
    }

    const accesToken = authHeader.split(' ')[1];

    if (!accesToken) {
      return next(ApiErrors.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accesToken);

    if (!userData) {
      return next(ApiErrors.UnauthorizedError());
    }

    req.userData = userData;

    next();
  } catch (error) {
    return next(ApiErrors.UnauthorizedError());
  }
};
