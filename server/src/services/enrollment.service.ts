import Enrollment from "../models/enrollment.model";
import mongoose from "mongoose";
import User from "../models/user.model";
import Course from "../models/course.model";
import {newResponse} from "../utils/response";
import {newError} from "../utils/errors";

export const enrollStudent = async (userId: mongoose.Types.ObjectId, courseId: mongoose.Types.ObjectId) => {
	const enrollment = new Enrollment({
		userId,
		courseId,
		enrollmentDate: new Date(),
	});

	await enrollment.save();
	return enrollment;
};


export const completeLesson = async (userId: string, courseId: string, lessonId: string) => {
	const enrollment = await Enrollment.findOne({ userId, courseId });
	if (!enrollment) throw new Error('Enrollment not found');
	console.log(lessonId);

	if (!enrollment.completedLessons.includes(lessonId as any)) {
		enrollment.completedLessons.push(lessonId as any);
		await enrollment.save();
	}

	return enrollment;
};

export const updateProgress = async (userId: string, courseId: string, progress: number) => {
	const enrollment = await Enrollment.findOne({ userId, courseId });
	if (!enrollment) throw newError(404, 'Enrollment not found');

	enrollment.progress = progress;
	await enrollment.save();

	return enrollment;
};

export const completeCourse = async (userId: string, courseId: string) => {
	const enrollment = await Enrollment.findOne({ userId, courseId });
	if (!enrollment) throw newError(404, 'Enrollment not found');

	enrollment.completed = true;
	enrollment.completedCoursesDates.push({ courseId: new mongoose.Types.ObjectId(courseId), date: new Date() });
	await enrollment.save();

	return enrollment;
};

export const getUserEnrollments = async (userId: string) => {
	const enrollments = await Enrollment.find({ userId });
	if (!enrollments) throw newError(404, 'No enrollments found for this user');

	return enrollments;
};

export const userEnrolledInCourse = async (userId: string, courseId: string) => {
	const enrollment = await Enrollment.findOne({ userId, courseId });
	if (!enrollment) throw newError(404, "");

	return enrollment;
}

