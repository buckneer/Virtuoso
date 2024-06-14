import mongoose, { Document, Schema, model } from 'mongoose'

export interface EnrollmentDocument extends Document {
	userId: mongoose.Types.ObjectId;
	courseId: mongoose.Types.ObjectId;
	enrollmentDate: Date;
	progress: number; // percentage of completion
	completed: boolean;
	completedLessons: mongoose.Types.ObjectId[];
	completedCoursesDates: { courseId: mongoose.Types.ObjectId; date: Date }[];
}

const EnrollmentSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
	enrollmentDate: { type: Date, default: Date.now },
	progress: { type: Number, default: 0 },
	completed: { type: Boolean, default: false },
	completedLessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
	completedCoursesDates: [
		{
			courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
			date: { type: Date }
		}
	],
});

const Enrollment = model<EnrollmentDocument>('Enrollment', EnrollmentSchema);

export default Enrollment;


