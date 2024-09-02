import User, { UserDocument } from "../models/user.model";
import {newError} from "../utils/errors";
import { randomBytes } from 'crypto';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Session, { SessionDocument } from "../models/session.model";
import logger from "../logger";
import crypto from 'crypto';
import { sendEmailConfirmMail, sendResetPasswordEmail } from "../utils/mailer";
import Reset, { ResetDocument } from "../models/reset.model";


export const registerUser = async (user: UserDocument) => {
	let userExists= await User.findOne({"$or": [{email: user.email}, {username: user.username}]});

	if (userExists) {
		throw newError(409, "User already exists");
	} else {
		user.password = await bcrypt.hash(user.password!, 10);
		const newUser = new User({...user});
		const registered = await newUser.save();
		return {"message": "User created"};
	}
}

export const loginUser = async (username: string, password: string, userAgent: string) => {
	const user = await User.findOne({username: username});
	const expire = process.env.TOKEN_EXPIRE as string;
	if (user) {
		let matchingPass = await bcrypt.compare(password, user.password!);
		if (matchingPass) {
			const accessToken = jwt.sign({id: user._id, username: user.username, role: user.role}, process.env.JWT_SECRET as string, {expiresIn: expire});
			const refreshToken = jwt.sign({id: user._id, username: user.username, role: user.role},
				process.env.REFRESH_SECRET as string);

			let session = {
				userId: user._id,
				refreshToken: refreshToken,
				active: true,
				userAgent: userAgent
			}

			let newSession = new Session(session);
			let saved = await newSession.save();



			let newUserObject = await getProfile(username);

			return {
				"access_token": accessToken,
				"refresh_token": refreshToken,
				"user": newUserObject
			}



		} else {
			throw newError(401, "Username or password incorrect");

		}
	} else {
		throw newError(409, "Username and Password are required");
	}
}

export const logoutUser = async (username: string, userAgent: string) => {
	let user = await User.findOne({username});
	if (user) {
		let session = await Session.findOne({"userId": user._id, userAgent, active: true});
		if (session) {
			session.active = false;
			await session.save();


			return {message: "Logged out successfully"};
		} else {

			throw newError(401, "Access Token expired");
		}
	} else {
		throw newError(409, "User doesn't exist");
	}
}

export const refreshAccessToken = async (refreshToken: string, userAgent: string) => {
	const expire = process.env.TOKEN_EXPIRE as string;
	let session = await Session.findOne({refreshToken, "active": true, userAgent})
	if (!session) {
		throw newError(409, "Refresh token invalid");
	}
	let decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET as string);
	if (!decoded) {
		throw newError(409, "Refresh token invalid");
	}
	//@ts-ignore
	let user = await User.findOne({username: decoded.username});
	if (user) {
		const accessToken = jwt.sign({
			id: user._id,
			username: user.username,
			role: user.role
		}, process.env.JWT_SECRET as string, {expiresIn: expire});
		return {"access_token": accessToken};
	} else {
		return {
			status: 500,
			message: 'User already exists'
		}
	}
}


export const sendVerification = async (email: string) => {
	let user = await User.findOne({email});
	let code = randomBytes(4).toString('hex'); ;

	if (!user) {
		throw newError(404, "No user found");
	}
	user.code = code;
	await user.save();

	sendEmailConfirmMail(user.name, user.code, user.email);

	return {"message": "Email sent"};
}

export const confirmEmail = async (email: string, code: string) => {
	let user = await User.findOne({email});


	if (!(user && user.code == code)) {
		throw newError(404, "No user found");
	}
	user.confirmed = true;
	await user.save();


	return {"message": "Email confirmed"};
}


export const sendPasswordReset = async (email: string) => {

	let user = await User.findOne({email});
	let passCode = randomBytes(16).toString('hex');

	if(!user) {
		throw newError(404, "No user found");
	}

	let resetItem : Partial<ResetDocument> = {
		code: passCode,
		userId: user._id,
		active: true,
	}

	let newReset = new Reset({...resetItem});
	await newReset.save();

	sendResetPasswordEmail(user.name, user.email, passCode);

	return {"message": "Email sent"};
}

export const getProfile = async(username: string) => {
	let user = await User.findOne({username}, {password: 0, code: 0});


	if(!user) {
		throw newError(404, "No user found");
	}

	return user;
}


export const forgotPassword = async (email: string, code: string, newPassword: string) => {

	let user = await User.findOne({email});


	if(!user) {
		throw newError(404, "No user found");
	}

	let userId = user._id;
	let resetLink = await Reset.findOne({userId, code});

	if(!resetLink) {
		throw newError(404, "User or code doesn't exist");
	}


	if(resetLink.active != true) {
		throw newError(401, "The reset link is already used");
	}


	let expired = hasThirtyMinutesPassed(resetLink.createdAt);

	if(expired) {
		throw newError(401, "The reset link expired");
	}

	// TODO check if the passwords are same

	resetLink.active = false;
	user.password = await bcrypt.hash(newPassword, 10);

	await user.save();
	await resetLink.save();

	return {"message": "Password updated"};

}


function hasThirtyMinutesPassed(time: string): boolean {
    // Parse the date string into a Date object
    const dbDate: Date = new Date(time);

    // Get the current date and time
    const currentDate: Date = new Date();

    // Calculate the difference in milliseconds
    const difference: number = currentDate.getTime() - dbDate.getTime();

    // Convert the difference from milliseconds to minutes
    const differenceInMinutes: number = difference / (1000 * 60);

    // Return true if 30 minutes have passed, false otherwise
    return differenceInMinutes >= 30;
}



