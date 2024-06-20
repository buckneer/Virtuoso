import Enrollment from "../models/enrollment.model";
import mongoose from "mongoose";
import User from "../models/user.model";
import Course from "../models/course.model";

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

	if (!enrollment.completedLessons.includes(lessonId as any)) {
		enrollment.completedLessons.push(lessonId as any);
		await enrollment.save();
	}

	return { message: 'Lesson marked as completed' };
};

export const updateProgress = async (userId: string, courseId: string, progress: number) => {
	const enrollment = await Enrollment.findOne({ userId, courseId });
	if (!enrollment) throw new Error('Enrollment not found');

	enrollment.progress = progress;
	await enrollment.save();

	return enrollment;
};

export const completeCourse = async (userId: string, courseId: string) => {
	const enrollment = await Enrollment.findOne({ userId, courseId });
	if (!enrollment) throw new Error('Enrollment not found');

	enrollment.completed = true;
	enrollment.completedCoursesDates.push({ courseId: new mongoose.Types.ObjectId(courseId), date: new Date() });
	await enrollment.save();

	return enrollment;
};

export const getUserEnrollments = async (userId: string) => {
	const enrollments = await Enrollment.find({ userId });
	if (!enrollments) throw new Error('No enrollments found for this user');

	return enrollments;
};
