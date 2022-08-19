import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import JWT from 'jsonwebtoken';

dotenv.config();

export const Auth = {
    private: (req: Request, res: Response, next: NextFunction) => {
        let success = false;

        if (req.headers.authorization) {
            const [authType, token] = req.headers.authorization.split(' ');
            try {
                if (authType === 'Bearer') {
                    JWT.verify(
                        token,
                        process.env.JWT_SECRET_KEY as string
                    );

                    success = true;
                }
            } catch (erro) {}
        }

        if (success) {
            next();
        } else {
            res.json({ error: 'Não autorizado' }).status(403);
        }
    },
};
