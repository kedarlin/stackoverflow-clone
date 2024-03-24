import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
import { config } from 'dotenv';

config();

export const verifyToken = (req, res, next) => {
    let token = req.cookies.access_token;
    if (!token) {
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }
    if (!token) {
        return next(errorHandler(401, 'Unauthorized')); // Return here
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return next(errorHandler(401, 'Unauthorized')); // Return here
            }
            req.user = user;
            next();
        });
    } catch (error) {
        return next(errorHandler(400, 'Bad Request')); // Return here
    }
};