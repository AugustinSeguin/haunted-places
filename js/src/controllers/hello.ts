import { Request, Response } from "express";

export const sayHello = (req: Request, res: Response): void => {
    res.send("Hello World");
};
