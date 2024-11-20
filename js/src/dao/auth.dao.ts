import { UserModel } from '../models/user.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Database from '../database/database';

export class AuthDAO {
    public static async register(email: string, password: string): Promise<UserModel> {
        try {
            const connection = await Database.getInstance();

            // Check if the email already exists
            const [existingUserRows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
            if ((existingUserRows as UserModel[]).length > 0) {
                throw new Error('Email already in use');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await connection.execute(
                'INSERT INTO users (email, password, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
                [email, hashedPassword]
            );

            const userId = (result as any).insertId;
            const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [userId]);
            const user = (rows as UserModel[])[0];

            return user;
        } catch (error) {
            throw new Error('Error registering user: ' + error.message);
        }
    }

    public static async login(email: string, password: string): Promise<UserModel> {
        try {
            const connection = await Database.getInstance();
            const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
            const user = (rows as UserModel[])[0];

            if (!user) {
                throw new Error('User not found');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            return user;
        } catch (error) {
            throw new Error('Error logging in: ' + error.message);
        }
    }
}