import Lesson, {LessonDocument} from "../models/lesson.model";
import Course from "../models/course.model";
import {newError} from "../utils/errors";




export const createLesson = async (name: string, description: string, lectureId: string, attachmentPaths: string[]) => {


	// let course = await Course.findOne({_id: courseId});
	// if (!course) throw newError(404, 'Course not found');

	const lesson = new Lesson({
		name,
		description,
		lectureId,
		attachments: attachmentPaths
	});

	let newLesson = await lesson.save();

	console.log("HERE IS THE ERROR");
	// await Course.updateOne({_id: courseId}, {
	// 	$addToSet: {
	// 		lessons: newLesson._id
	// 	}
	// })

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
