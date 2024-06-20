import express from "express";
import {
	handleCompleteCourse,
	handleCompleteLesson,
	handleEnrollStudent, handleGetUserEnrollments,
	handleUpdateProgress
} from "../controllers/enrollment.controller";



const router = express.Router({mergeParams: true});

router.post('/', handleEnrollStudent);
router.post('/lessons/:lessonId/complete', handleCompleteLesson);
router.put('/progress', handleUpdateProgress);
router.post('/complete', handleCompleteCourse);
router.get('/user/:userId', handleGetUserEnrollments);


export {router as enrollmentRouter};
