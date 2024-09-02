export interface Enrollment {
	_id: string;
	userId: string;
	courseId: string;
	enrollmentDate: Date;
	progress: number;
	completed: boolean;
	completedLessons: string[];
	completedCoursesDates: { courseId: string[]; date: Date }[];
}
