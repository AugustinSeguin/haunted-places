import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import "dotenv/config";

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['authorization']?.split(' ')[1];
    const fullToken = req.headers.authorization;
    if (!fullToken) {
        res.status(401).send("No token provided");
    }
    else {

        const [typeToken, token] = fullToken.split(" ");
        if(typeToken !== "Bearer"){
            res.status(401).send("Invalid token type");
        }
        else {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET!)
                if (decoded) {
                    next();
                }
                else {
                    res.status(401).send("Invalid token");
                }
            }
            catch(e){
                console.log('invalid token on verify', e)
                res.status(401).send("Invalid token on verify");
            }
        }
    }

}