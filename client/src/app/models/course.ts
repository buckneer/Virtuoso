import {Lecture} from "./lecture";

export interface Course {
	_id: string,
	userId: string,
	title: string,
	description?: string,
	cover?: string,
	length?: string,
	level?: number,
	lectures: Lecture[],
	price?: number,
	rating?: number,

}
