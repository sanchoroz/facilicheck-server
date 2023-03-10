import { check, validationResult } from 'express-validator';
import ApiErrors from '../exceptions/api-errors.js';

export const validateUserRegister = [
  check('email').isEmail(),
  check('password').isLength({ min: 3 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(ApiErrors.BadRequest('Server validation error', errors.array()));
    }
    next();
  },
];

export const validateUserLogin = [
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Please enter your email')
    .isEmail()
    .withMessage('Email is not correct'),
  check('password')
    .trim()
    .notEmpty()
    .withMessage('Please enter your password')
    .isLength({ min: 3 })
    .withMessage('Please enter correct password'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(ApiErrors.BadRequest('Server validation error', errors.array()));
    }
    next();
  },
];
