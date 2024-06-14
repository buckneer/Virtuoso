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

export const enrollInCourse = async (userId: string, courseId: string) => {
	const user = await User.findById(userId);
	if (!user) throw new Error('User not found');

	const course = await Course.findById(courseId);
	if (!course) throw new Error('Course not found');

	const existingEnrollment = await Enrollment.findOne({ userId, courseId });
	if (existingEnrollment) throw new Error('User already enrolled in this course');

	const enrollment = new Enrollment({ userId, courseId });
	await enrollment.save();

	return { message: 'Enrollment successful' };
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


