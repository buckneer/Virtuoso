
import {handleConfirmEmail, handleGetUser, handleLogin, handleLogout, handleRefresh, handleRegisterUser, handleResetPassword, handleSendPasswordReset, handleSendVerification } from "./controllers/user.controller";
import {Express, Request, Response} from "express";
import {userGuard} from "./middleware/routeGuard";
import {courseRouter} from "./routers/course.router";
import {lessonRouter} from "./routers/lesson.router";
import {lectureRouter} from "./routers/lecture.router";
import {enrollmentRouter} from "./routers/enrollment.router";


export default function (app: Express) {
	app.get("/healthcheck", (request: Request, response: Response) => response.sendStatus(200));
	app.get("/protected", userGuard, (request: Request, response: Response) => response.sendStatus(200));


	app.use('/course', userGuard, courseRouter);
	app.use('/lesson', userGuard, lessonRouter);
	app.use('/lecture', userGuard, lectureRouter);
	app.use('/enroll', userGuard, enrollmentRouter);

	// User Auth Routes
	app.post("/register", handleRegisterUser);
	app.post("/login", handleLogin);
	app.post("/refresh", handleRefresh);
	app.post("/verification", handleSendVerification);
	app.post("/verify", handleConfirmEmail);
	app.get('/profile', userGuard, handleGetUser);
	app.post("/reset", handleSendPasswordReset);
	app.post('/reset/password', handleResetPassword);
	app.delete("/logout", userGuard, handleLogout);
}
