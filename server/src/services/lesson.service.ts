import Lesson, {LessonDocument} from "../models/lesson.model";
import Lecture from "../models/lecture.model";
import {newError} from "../utils/errors";
import {newResponse} from "../utils/response";
import User from "../models/user.model";
import {Types} from "mongoose";
import {objectId} from "../utils";



export const createLesson = async (title: string, content: string, courseId: string, attachmentPaths: string[]) => {
	const lesson = new Lesson({
		title,
		content,
		courseId,
		attachments: attachmentPaths
	});

	await lesson.save();
	return lesson;
};

export const getLesson = async (_id: string) => {
    // TODO Implement service
}

export const getLessons = async () => {
    // TODO Implement service
}

export const updateLesson = async (id: string, data: any) => {
   // TODO Implement service
}

export const deleteLesson = async (id: string) => {
	// TODO implement service
}

export const getLessonsForLecture = async (lectureId: string) => {
	let lessons = await Lesson.find({ lectureId });
	return lessons;
}
