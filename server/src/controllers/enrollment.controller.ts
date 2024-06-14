import {NextFunction, Request, Response} from "express";
import mongoose from "mongoose";
import {enrollStudent} from "../services/enrollment.service";
import {completeLesson} from "../services/lesson.service";

export const handleEnrollStudent = async (req: Request, res: Response) => {
    try {
        const { userId, courseId } = req.body;
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const courseObjectId = new mongoose.Types.ObjectId(courseId);

        const enrollment = await enrollStudent(userObjectId, courseObjectId);

        res.status(201).json(enrollment);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
};

export const handleCompleteLesson = async (req: Request, res: Response) => {
    try {
        const { lessonId } = req.body;
        const { id } = req.user!;

        const enrollment = await completeLesson(id, lessonId);

        res.status(200).json(enrollment);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
};
