import Course from "../models/course.model";
import Lecture, {LectureDocument} from "../models/lecture.model";
import {newError} from "../utils/errors";
import {newResponse} from "../utils/response";
import User from "../models/user.model";
import {objectId} from "../utils";


export const addLecture = async (data: LectureDocument) => {
	let course = await Course.findById(data.courseId);
	if (!course) throw newError(404, 'Course not found');

	let newLecture = new Lecture(data);
	await newLecture.save();

	// @ts-ignore
	course.lectures.push(newLecture._id);
	await course.save();

	return newResponse('New Lecture Created');
}

export const getLecture = async (_id: string) => {
	let lecture = await Lecture.findOne({_id});
	if(!lecture) throw newError(404, "No lecture found");
	return lecture;
}

export const getLectures = async () => {
    let lectures = await Lecture.find({});
	if(!lectures) throw newError(404, "No lectures");

	return lectures;
}

export const updateLecture = async (id: string, data: Partial<LectureDocument>) => {
   let lecture = await Lecture.findOne({_id: id});

   if(!lecture) throw newError(404, "No lecture found");

	let update = await Lecture.updateOne({_id: id}, {
		$set: {
			...data
		}
	});

	if(!update) throw newError(500, "Internal Server Error");

	return newResponse('Lecture Updated');
}

export const deleteLecture = async (id: string) => {
	let lecture = await Lecture.findOne({_id: id});
	if(!lecture) throw newError(404, "No lecture found");
	let deleted = Lecture.deleteOne({_id: id});
	if(!deleted) throw newError(500, "Internal Server Error");
	return newResponse('Lecture Deleted');
}

export const getLecturesForCourse = async (courseId: string) => {
	let lectures = await Lecture.find({ courseId });
	return lectures;
}



