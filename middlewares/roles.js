import ApiErrors from '../exceptions/api-errors.js';
import tokenService from '../service/token-service.js';

export const rolesAuth = (authRoles) => {
  return function (req, res, next) {
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
      const { roles: userRoles } = userData;

      if (!userData) {
        return next(ApiErrors.UnauthorizedError());
      }

      let hasRole = false;

      userRoles.forEach((role) => {
        if (authRoles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        return next(ApiErrors.UnauthorizedError());
      }
      next();
    } catch (error) {
      return next(ApiErrors.UnauthorizedError());
    }
  };
};
