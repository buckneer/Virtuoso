import { Request, Response } from "express";
import {
    createLesson,
    deleteLesson,
    getLesson,
    getLessons,
    getLessonsForLecture,
    updateLesson
} from "../services/lesson.service";
import {LessonDocument} from "../models/lesson.model";

export async function handleAddLesson(req: Request, res: Response) {
    try {
        const { title, content, courseId } = req.body;
        const attachmentPaths = req.files ? (req.files as Express.Multer.File[]).map(file => file.path) : [];

        const lesson = await createLesson(title, content, courseId, attachmentPaths);

        res.status(201).json(lesson);
    } catch (e: any) {
        return res.status(e.status || 500).send(e.message);
    }
}

export async function handleGetLessons(req: Request, res: Response) {
    try {
        let resp = await getLessons();
        return res.send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e.message);
    }
}

export async function handleGetLesson(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let resp = await getLesson(id);
        return res.send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e.message);
    }
}

export async function handleUpdateLesson(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let data = {
            ...req.body
        }
        let resp = await updateLesson(id, data);
        return res.send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e.message);
    }
}

export async function handleDeleteLesson(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let resp = await deleteLesson(id);
        return res.send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e.message);
    }
}

export async function handleGetLessonsForLecture(req: Request, res: Response) {
    try {
        let { lectureId } = req.params;

        let resp = await getLessonsForLecture(lectureId);
        return res.send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}

