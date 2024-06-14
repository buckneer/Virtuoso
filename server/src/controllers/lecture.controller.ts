import { Request, Response } from "express";
import {
    addLecture,
    deleteLecture,
    getLecture,
    getLectures,
    getLecturesForCourse,
    updateLecture
} from "../services/lecture.service";
import {LectureDocument} from "../models/lecture.model";

export async function handleAddLecture(req: Request, res: Response) {
    try {
        let data: LectureDocument = {
            courseId: req.body.courseId,
            ...req.body
        }

        let resp = await addLecture(data);
        return res.status(200).send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e.message);
    }
}

export async function handleGetLectures(req: Request, res: Response) {
    try {
        let resp = await getLectures();
        return res.send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e.message);
    }
}

export async function handleGetLecture(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let resp = await getLecture(id);
        return res.send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e.message);
    }
}

export async function handleUpdateLecture(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let data = {
            ...req.body
        }
        let resp = await updateLecture(id, data);
        return res.send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e.message);
    }
}

export async function handleDeleteLecture(req: Request, res: Response) {
    try {
        let { id } = req.params;
        let resp = await deleteLecture(id);
        return res.send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e.message);
    }
}

export async function handleGetLecturesForCourse(req: Request, res: Response) {
    try {
        let { courseId } = req.params;

        let resp = await getLecturesForCourse(courseId);
        return res.send(resp);
    } catch (e: any) {
        return res.status(e.status || 500).send(e || 'Internal Server Error');
    }
}
