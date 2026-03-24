import jwt from 'jsonwebtoken';
import { ConfigManager } from '../config/configManager';

const config = ConfigManager.getInstance();

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: '1d',
  });
};