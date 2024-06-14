import express from "express";
import {handleAddLesson, handleGetLessonsForLecture} from "../controllers/lesson.controller";
import multer from "multer";
import {storage} from "../utils";



const router = express.Router({mergeParams: true});

const upload = multer({ storage });


router.post('/lessons', upload.array('attachments', 10), handleAddLesson);
router.get('/lectures/:lectureId/lessons', handleGetLessonsForLecture);

export {router as lessonRouter};
