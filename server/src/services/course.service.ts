import Course, {CourseDocument} from "../models/course.model";
import {newError} from "../utils/errors";
import {newResponse} from "../utils/response";
import Lecture from "../models/lecture.model";
import Lesson from "../models/lesson.model";
import {ObjectId} from "mongoose";
import {objectId} from "../utils";
import User from "../models/user.model";



export const createCourse = async (userId: string, title: string, description: string, photoPath: string) => {
	const course = new Course({
		userId,
		title,
		description,
		cover: photoPath
	});

	await course.save();
	return course;
};


export const getCourses = async (userId?: string) => {
	let courses = [];

	if(userId) {
		let userObject = objectId(userId);
		courses = await Course.find({userId: userObject});
	} else {
		courses = await Course.find();
	}

	return courses;

}


export const getCourse = async (courseId: string, userId?: string) => {
	let course;
	if(userId) {
		course = await Course.findOne({_id: courseId, userId});
	} else {
		course = await Course.findOne({_id: courseId});
	}
	if(!course) throw newError(404, "No course found");
	return course;
}


export const updateCourse = async (courseId: string, data: Partial<CourseDocument>) => {

	let course = await Course.findOne({_id: courseId});

	if(!course) throw newError(404, "No course found");

	let update = await Course.updateOne({_id: courseId}, {
		$set: {
			...data
		}
	});

	if(!update) throw newError(500, "Internal Server Error");

	return newResponse('Course Updated');


}

export const deleteCourse = async (courseId: string) => {
	let course = await Course.findOne({_id: courseId});

	if(!course) throw newError(404, "No course found");

	let deleted = Course.deleteOne({_id: courseId});

	if(!deleted) throw newError(500, "Internal Server Error");
	return newResponse('Course Deleted');
}


export const getLecturesByCourse = async (courseId: string) => {
	let lectures = await Lecture.find({ courseId });
	if (!lectures) throw newError(404, "No lectures found for this course");
	return lectures;
}

export const getLessonsByLecture = async (lectureId: string) => {
	let lessons = await Lesson.find({ lectureId });
	if (!lessons) throw newError(404, "No lessons found for this lecture");
	return lessons;
}


export const getEnrolledCourses = async (userId: string) => {
	let courses = await Course.find({ enrollments: userId });
	return courses;
}

