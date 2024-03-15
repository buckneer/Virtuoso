
import { authenticateToken, handleConfirmEmail, handleGetUser, handleLogin, handleLogout, handleRefresh, handleRegisterUser, handleResetPassword, handleSendPasswordReset, handleSendVerification } from "./controllers/user.controller";
import {Express, Request, Response} from "express";


export default function (app: Express) {
	app.get("/healthcheck", (request: Request, response: Response) => response.sendStatus(200));

	// User Auth Routes
	app.post("/register", handleRegisterUser);
	app.post("/login", handleLogin);
	app.post("/refresh", handleRefresh);
	app.post("/verification", handleSendVerification);
	app.post("/verify", handleConfirmEmail);
	app.get('/profile', authenticateToken, handleGetUser);
	app.post("/reset", handleSendPasswordReset);
	app.post('/reset/password', handleResetPassword);
	app.get("/protected", authenticateToken, (request: Request, response: Response) => response.sendStatus(200));
	app.delete("/logout", authenticateToken, handleLogout);
}
