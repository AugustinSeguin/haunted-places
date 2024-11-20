import { Request, Response, NextFunction } from 'express';

const likeTimestamps: { [key: string]: number } = {};

export async function dosProtectionMiddleware(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip;
    const currentTime = Date.now();

    if (ip) {
        if (likeTimestamps[ip] && currentTime - likeTimestamps[ip] < 2000) {
            res.status(429).json({ error: 'Too many requests. Please wait a moment before liking again.' });
        }
        likeTimestamps[ip] = currentTime;
    console.log('IP:', likeTimestamps);
    }

    next();
};
