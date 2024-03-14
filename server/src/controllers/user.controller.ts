import {NextFunction, Request, Response} from "express";
import {confirmEmail, forgotPassword, getProfile, loginUser, logoutUser, refreshAccessToken, registerUser, sendPasswordReset, sendVerification} from "../services/user.service";
import {UserDocument} from "../models/user.model";
import jwt from "jsonwebtoken";
import log from "../logger";
import { handleCustomError } from "../utils/errors";

export async function handleRegisterUser(req: Request, res: Response) {
	try {
		let user : UserDocument = {
			...req.body
		}

		let resp = await registerUser(user);

		//
		return res.send(JSON.stringify({"message": "Registered"}));
	} catch (e: any) {
		// log.error(e.message);
		// return handleCustomError(e, res);
		return res.status(e.status).send(JSON.stringify(e));
	}
}

export async function handleLogin(req: Request, res: Response) {
	try {
		let username = req.body.username
		let password = req.body.password;
		let userAgent = req.headers['user-agent'];
		if (userAgent) {
			let session = await loginUser(username, password, userAgent)

			return res.send(JSON.stringify(session))
		}
		return res.status(401).send("User agent is required");
	} catch (e: any) {
		log.error(e.message);
		return res.status(e.status).send(JSON.stringify(e));
	}
}

export async function handleRefresh(req: Request, res: Response) {
	try {
		let refreshToken = req.body.refresh_token;
		let userAgent = req.headers['user-agent'];

		if (userAgent) {
			let resp = await refreshAccessToken(refreshToken, userAgent);

			return res.send(JSON.stringify(resp))
		}

		return res.status(401).send("User agent is required");
	} catch (e: any) {
		log.error(e.message);
		return res.status(e.status).send(JSON.stringify(e));
	}
}


export async function handleLogout(req: Request, res: Response) {
	try {
		//@ts-ignore
		let username = req.user.username;
		let userAgent = req.headers['user-agent'];

		if(userAgent) {
			let logoutResp = await logoutUser(username, userAgent);
			
			if (logoutResp) {
				return res.sendStatus(202);
			} else {
				return res.sendStatus(400);
			}
		} else {
			return res.sendStatus(400).send(JSON.stringify({
				status: 409,
				message: "Useragent is required"
			}));
		}


	} catch (e: any) {
		log.error(e.message);
		return res.status(e.status).send(JSON.stringify(e));
	}
}

export async function handleSendVerification(req: Request, res: Response) {
	try {
		//@ts-ignore
		let email = req.body.email;

		if(email) {
			let mailResponse = await sendVerification(email);
			
			if (mailResponse) {
				return res.sendStatus(202);
			} else {
				return res.sendStatus(400);
			}
		} else {
			return res.sendStatus(400).send("Email is required");
		}


	} catch (e: any) {
		log.error(e.message);
		return res.status(409).send(e.message)
	}
}

export async function handleConfirmEmail(req: Request, res: Response) {
	try {
		//@ts-ignore
		let email = req.query.email as string;
        let code = req.query.verify as string;

		if(email && code) {
			let logoutResp = await confirmEmail(email, code);
			
			if (logoutResp) {
				return res.sendStatus(200);
			} else {
				return res.sendStatus(400);
			}
		} else {
			return res.sendStatus(400).send("Email is required");
		}


	} catch (e: any) {
		log.error(e.message);
		return res.status(409).send(e.message)
	}
}

export async function handleSendPasswordReset(req: Request, res: Response) {
    try {
		//@ts-ignore
		let email = req.body.email;

		if(email) {
			let mailResponse = await sendPasswordReset(email);
			
			if (mailResponse) {
				return res.send(mailResponse);
			} else {
				return res.sendStatus(400);
			}
		} else {
			return res.sendStatus(400).send("Email is required");
		}


	} catch (e: any) {
		log.error(e.message);
		return res.status(409).send(e.message)
	}
}

export async function handleResetPassword(req: Request, res: Response) {
	try {
		
		let email = req.body.email as string;
        let code = req.body.code as string;
        let password = req.body.password as string;

		if(email && code && password) {
			let logoutResp = await forgotPassword(email, code, password);
			
			if (logoutResp) {
				return res.send(logoutResp);
			} else {
				return res.sendStatus(400);
			}
		} else {
			return res.sendStatus(400).send("Email is required");
		}


	} catch (e: any) {
		log.error(e.message);
		return res.status(409).send(e.message)
	}
}

export async function handleGetUser(req: Request, res: Response) {
    
    
    try {
		//@ts-ignore
		let currUsername = req.user.username;
			
		let profile = await getProfile(currUsername);
			
        return res.send(JSON.stringify(profile));

	} catch (e: any) {
		log.error(e.message);
		return res.status(409).send(e.message)
	}
    
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	if(authHeader) {
		const token = authHeader.split( " ")[1];
		if (token == null) return res.sendStatus(401);
		jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
			if (err) return res.sendStatus(403);
			//@ts-ignore
			req.user = user;
			next();
		});
	} else {
		res.sendStatus(403);
	}
}

export const adminToken = async (req: Request, res: Response, next: NextFunction)=> {
    const authHeader = req.headers['authorization'];
	if(authHeader) {
		const token = authHeader.split( " ")[1];
		if (token == null) return res.sendStatus(401);
		jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
			if (err) return res.sendStatus(403);
			//@ts-ignore
            if(user.role == "admin") {
                //@ts-ignore
                req.user = user;
			    next();
            } else {
                return res.sendStatus(401);
            }
		});
	} else {
		res.sendStatus(403);
	}
}
