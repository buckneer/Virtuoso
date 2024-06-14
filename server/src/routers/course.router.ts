import express from "express";
import {
	handleCreateCourse, handleDeleteCourse, handleEnrollCourse, handleFinishCourse,
	handleGetCourse, handleGetCourseByUser,
	handleGetCourses, handleGetCoursesByUser, handleGetEnrolledCourses,
	handleUpdateCourse
} from "../controllers/course.controller";
import {upload} from "../app";

const router = express.Router({mergeParams: true});

router.get('/', handleGetCourses);
router.get('/:courseId', handleGetCourse);
router.post('/', upload.single('photo'), handleCreateCourse);
router.put('/:courseId', handleUpdateCourse);
router.delete('/:courseId', handleDeleteCourse);

router.get('/user', handleGetCoursesByUser);
router.get('/user/:courseId', handleGetCourseByUser);

router.post('/courses/:courseId/enroll', handleEnrollCourse);
router.post('/courses/:courseId/finish', handleFinishCourse);
router.get('/courses/enrolled', handleGetEnrolledCourses);

export {router as courseRouter};
