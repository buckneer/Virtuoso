import express from "express";
import {handleCompleteLesson, handleEnrollStudent} from "../controllers/enrollment.controller";



const router = express.Router({mergeParams: true});

router.post('/enroll', handleEnrollStudent);
router.post('/lessons/:lessonId/complete', handleCompleteLesson);


export {router as enrollmentRouter};
