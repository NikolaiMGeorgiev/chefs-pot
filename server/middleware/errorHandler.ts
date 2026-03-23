import type { Request, Response } from "express";

type RequestError  = Error & {
    status?: number
}

export default function errorHandler(error: RequestError, req: Request, res: Response) {
    console.log(error);
    res.status(error.status || 500).json({
        error: error.message
    });
}