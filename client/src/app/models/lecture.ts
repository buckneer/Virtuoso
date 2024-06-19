import {Lesson} from "./lesson";

export interface Lecture {
	_id: string,
	courseId: string,
	name: string,
	description: string,
	length: string,
	type: string,
	content: string,
	lessons: Lesson[]
}
