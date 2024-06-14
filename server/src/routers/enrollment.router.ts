import express from "express";
import {handleEnrollStudent} from "../controllers/enrollment.controller";
import {handleCompleteLesson} from "../controllers/lesson.controller";



const router = express.Router({mergeParams: true});

router.post('/enroll', handleEnrollStudent);
router.post('/lessons/:lessonId/complete', handleCompleteLesson);


export {router as enrollmentRouter};
