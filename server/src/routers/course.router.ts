import express from "express";
import {
	handleCreateCourse, handleDeleteCourse,
	handleGetCourse, handleGetCourseByUser,
	handleGetCourses, handleGetCoursesByUser,
	handleUpdateCourse
} from "../controllers/course.controller";

const router = express.Router({mergeParams: true});

router.get('/', handleGetCourses);
router.get('/:courseId', handleGetCourse);
router.post('/', handleCreateCourse);
router.put('/:courseId', handleUpdateCourse);
router.delete('/:courseId', handleDeleteCourse);

router.get('/user', handleGetCoursesByUser);
router.get('/user/:courseId', handleGetCourseByUser);

export {router as courseRouter};
