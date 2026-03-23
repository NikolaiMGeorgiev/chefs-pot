import type { NextFunction, Request, Response } from "express";
import jtw, { type JwtPayload, type VerifyErrors } from "jsonwebtoken";

const noCookieEndpoints = [
    /^\/recipes\??.*$/,
    /^\/api\/recipes\/[0-9]+$/,
    /\/api\/my-recipes/,
    /\/filtered-recipes/
]

export default function autheticateToken(req: Request, res: Response, next: NextFunction) {
    const cookie: string = req.cookies["authcookie"];
    if (!cookie) {
        if (!noCookieEndpoints.filter(endpoint => endpoint.test(req.originalUrl)).length) {
            return res.status(401).send();
        }
    } else {
        jtw.verify(cookie, process.env.ACCESS_TOKEN_SECRET as string, undefined, (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
            if (err || !isReqUser(decoded)) {
                res.status(403).send();
            } else {
                req.user = decoded;
            }
        });
    }
    next();
}


interface ReqUser {
  id: number;
}

function isReqUser(payload: any): payload is ReqUser {
  return (
    payload &&
    typeof payload === "object" &&
    "id" in payload &&
    typeof payload.id === "number"
  );
}