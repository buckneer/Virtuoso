import {NextFunction, Request, Response} from "express";
import {newError} from "../utils/errors";
import jwt from "jsonwebtoken";


export interface UserToken {
	id: string,
	username: string;
	role: string;
}


export const userGuard = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers['authorization'];
		if(!authHeader) throw newError(403, 'Authorization heder je obavezan');

		const token = authHeader.split(' ')[1];
		if(!token) throw newError(403, 'Token je obavezan');

		jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
			if(err) return res.status(401).send(newError(401, 'Token je istekao'));
			req.user = user as UserToken;
			next();
		})
	} catch (e: any) {
		console.error(e);
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}
