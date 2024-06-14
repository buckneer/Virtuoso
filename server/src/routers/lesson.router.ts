import express from "express";
import {handleAddLesson, handleCompleteLesson, handleGetLessonsForLecture} from "../controllers/lesson.controller";
import {upload} from "../app";


const router = express.Router({mergeParams: true});


router.post('/lessons', upload.array('attachments', 10), handleAddLesson);
router.get('/lectures/:lectureId/lessons', handleGetLessonsForLecture);
router.post('/lessons/:lessonId/complete', handleCompleteLesson);

export {router as lessonRouter};
