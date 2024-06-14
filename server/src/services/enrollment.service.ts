import Enrollment from "../models/enrollment.model";
import mongoose from "mongoose";


export const enrollStudent = async (userId: mongoose.Types.ObjectId, courseId: mongoose.Types.ObjectId) => {
	const enrollment = new Enrollment({
		userId,
		courseId,
		enrollmentDate: new Date(),
	});

	await enrollment.save();
	return enrollment;
};


export const completeLesson = async (userId: mongoose.Types.ObjectId, lessonId: mongoose.Types.ObjectId) => {
	const enrollment = await Enrollment.findOne({ userId, 'completedLessons.courseId': lessonId });
	if (!enrollment) throw new Error('Enrollment not found');

	if (!enrollment.completedLessons.includes(lessonId)) {
		enrollment.completedLessons.push(lessonId);
		await enrollment.save();
	}

	return enrollment;
};
