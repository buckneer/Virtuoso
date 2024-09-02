import Lesson, {LessonDocument} from "../models/lesson.model";
import Course from "../models/course.model";
import {newError} from "../utils/errors";
import Lecture from "../models/lecture.model";




export const createLesson = async (name: string, description: string, type: string, lectureId: string, attachmentPaths: string[]) => {


	console.log(lectureId);

	let lecture = await Lecture.findOne({ _id: lectureId });
	if (!lecture) throw newError(404, 'Lecture not found');

	const lesson = new Lesson({
		name,
		description,
		type,
		lectureId,
		attachments: attachmentPaths
	});

	let newLesson = await lesson.save();


	// await Course.updateOne({_id: courseId}, {
	// 	$addToSet: {
	// 		lessons: newLesson._id
	// 	}
	// })

	await Lecture.updateOne({_id: lectureId}, {
		$addToSet: {
			lessons: newLesson._id
		}
	})

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
