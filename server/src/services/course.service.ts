import Course, {CourseDocument} from "../models/course.model";
import {newError} from "../utils/errors";
import {newResponse} from "../utils/response";


export const createCourse = async (course : CourseDocument) => {
	let newCourse = new Course(course);
	let newCreated = await newCourse.save();

	if(!newCreated) throw newError(500, "Internal Server Error");
}

export const getCourses = async (userId?: string) => {
	let courses = [];

	if(userId) {
		courses = await Course.find({userId});
	} else {
		courses = await Course.find();
	}

	return courses;

}


export const getCourse = async (courseId: string, userId?: string) => {
	let course;
	if(userId) {
		course = await Course.find({_id: courseId, userId});
	} else {
		course = await Course.find({_id: courseId});
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
