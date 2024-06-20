import express from "express";
import {handleAddLecture, handleGetLecturesForCourse} from "../controllers/lecture.controller";

const router = express.Router({mergeParams: true});

router.get('/', (req, res) => {});

router.post('/', handleAddLecture);
router.get('/courses/:courseId/lectures', handleGetLecturesForCourse);

export {router as lectureRouter};
