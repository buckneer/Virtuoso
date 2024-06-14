import express from "express";
import {handleAddLecture, handleCompleteLecture, handleGetLecturesForCourse} from "../controllers/lecture.controller";

const router = express.Router({mergeParams: true});

router.get('/', (req, res) => {});

router.post('/lectures', handleAddLecture);
router.get('/courses/:courseId/lectures', handleGetLecturesForCourse);
router.post('/lectures/:lectureId/complete', handleCompleteLecture);

export {router as lectureRouter};
