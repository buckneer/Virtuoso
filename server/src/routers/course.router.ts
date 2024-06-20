import express from "express";
import {
	handleCreateCourse, handleDeleteCourse,
	handleGetCourse, handleGetCourseByUser,
	handleGetCourses, handleGetCoursesByUser, handleGetEnrolledCourses, handleSearchCourses,
	handleUpdateCourse
} from "../controllers/course.controller";
import multer from "multer";
import {storage} from "../utils";



const upload = multer({ storage });


const router = express.Router({mergeParams: true});

router.get('/', handleGetCourses);
router.get('/search', handleSearchCourses);
router.get('/:courseId', handleGetCourse);
router.post('/', upload.single('photo'), handleCreateCourse);
router.put('/:courseId', handleUpdateCourse);
router.delete('/:courseId', handleDeleteCourse);

router.get('/user', handleGetCoursesByUser);
router.get('/user/:courseId', handleGetCourseByUser);

router.get('/courses/enrolled', handleGetEnrolledCourses);

export {router as courseRouter};
