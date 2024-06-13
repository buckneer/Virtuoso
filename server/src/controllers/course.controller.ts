import {Request, Response} from "express";
import {CourseDocument} from "../models/course.model";
import {createCourse, deleteCourse, getCourse, getCourses, updateCourse} from "../services/course.service";


export async function handleCreateCourse(req: Request, res: Response) {
	try {

		let user = req.user;
		let data: CourseDocument = {
			userId: user!.id,
			...req.body
		}
		let resp = await createCourse(data);
		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleGetCourse(req: Request, res: Response) {
	try {
		let { courseId } = req.params;
		let resp = await getCourse(courseId);
		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleGetCourses(req: Request, res: Response) {
	try {
		let resp = await getCourses();
		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleGetCourseByUser(req: Request, res: Response) {
	try {
		let { courseId } = req.params;
		let { id } = req.user!;
		let resp = await getCourse(courseId, id);
		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleGetCoursesByUser(req: Request, res: Response) {
	try {
		let { id } = req.user!;
		let resp = await getCourses(id);
		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}


export async function handleUpdateCourse(req: Request, res: Response) {
	try {
		let { courseId} = req.params;
		let data: Partial<CourseDocument> = {
			...req.body
		}

		let resp = await updateCourse(courseId, data);
		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}

export async function handleDeleteCourse(req: Request, res: Response) {
	try {
		let { courseId } = req.params;
		let resp = await deleteCourse(courseId);
		return res.send(resp);
	} catch (e: any) {
		return res.status(e.status || 500).send(e || 'Internal Server Error');
	}
}
