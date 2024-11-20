import { Request, Response } from 'express';
import { AuthDAO } from '../dao/auth.dao';
import { UserModel } from '../models/user.dto';
import jwt from 'jsonwebtoken';

class AuthController {
    public static async register(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            const user: UserModel = await AuthDAO.register(email, password);
            const token = jwt.sign(user, process.env.JWT_SECRET!);
            res.json({
                token,
                ...user
            });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(400).json({ error: error.message });
        }
    }

    public static async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            const user: UserModel = await AuthDAO.login(email, password);
            const token = jwt.sign(user, process.env.JWT_SECRET!);
            res.json({
                token,
                ...user
            });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(400).json({ error: error.message });
        }
    }
}

export default AuthController;