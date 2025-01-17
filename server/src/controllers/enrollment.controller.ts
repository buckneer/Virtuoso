import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import {
    enrollStudent,
    completeLesson,
    updateProgress,
    completeCourse,
    getUserEnrollments,
    userEnrolledInCourse
} from "../services/enrollment.service";
import {object} from "yup";
import {objectId} from "../utils";

export const handleEnrollStudent = async (req: Request, res: Response) => {
    try {
        const { userId, courseId } = req.body;
        const userObjectId = objectId(userId);
        const courseObjectId = objectId(courseId);

        const enrollment = await enrollStudent(userObjectId, courseObjectId);

        res.status(201).json(enrollment);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
};



export const handleCompleteLesson = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.body;
        const {lessonId} = req.params;
        const { id } = req.user!;

        const enrollment = await completeLesson(id, courseId, lessonId);

        res.status(200).json(enrollment);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
};

export const handleUpdateProgress = async (req: Request, res: Response) => {
    try {
        const { userId, courseId, progress } = req.body;

        const enrollment = await updateProgress(userId, courseId, progress);

        res.status(200).json(enrollment);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
};

export const handleCompleteCourse = async (req: Request, res: Response) => {
    try {
        // TODO CHANGE TO USER LOGGED IN
        const { userId, courseId } = req.body;

        const enrollment = await completeCourse(userId, courseId);

        res.status(200).json(enrollment);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
};

export const handleGetUserEnrollments = async (req: Request, res: Response) => {
    try {
        // const { userId } = req.params;
        const { id } = req.user!;

        const enrollments = await getUserEnrollments(id);

        res.status(200).json(enrollments);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
};

export const handleUserEnrolled = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const { id } = req.user!;
        const resp = await userEnrolledInCourse(id, courseId);

        return res.status(200).json(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}
